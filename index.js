import Baileys,{
  makeCacheableSignalKeyStore,
   makeInMemoryStore,
} from "@whiskeysockets/baileys";
import pino from "pino";
import express from "express";
const app = express();
import fs from "node:fs";
import WaConnection from "./Handlers/waconnection.js";
import MessageHandle from "./Handlers/message.js";
import action from "./utils/Commands.js";
import Verify from "./utils/verifyUser.js";
import { GroupDbFunctions, UserDbFunctions } from "./utils/dbFunctions.js";
import AuthenticationFromFile from "./utils/authFile.js";
import checkCreateUser from "./utils/checkCreateUser.js";
let folder = "Auth-Info";
import './config.js';
const useStore = false
const MAIN_LOGGER = pino({ timestamp: () => `,"time":"${new Date().toJSON()}"` });
import NodeCache from "node-cache";
const logger = MAIN_LOGGER.child({});
logger.level = "trace";
import qr from "qr-image";
import Scrape from 'neko_img_uploader'; // Adjust the path based on your project structure
const scrape = new Scrape()

const setupBaileysSocket = async () => {
  try {
    if (!fs.existsSync(folder)) {
      fs.mkdirSync(folder);
      console.log(`Auth info folder created....!!`);
    }
    const store = useStore ? makeInMemoryStore({ logger }) : undefined;
store?.readFromFile("./session");
// Save every 1m
setInterval(() => {
store?.writeToFile("./session");
}, 10000 * 6);

const msgRetryCounterCache = new NodeCache();
    const SingleAuth = new AuthenticationFromFile(folder);
    const { saveState, clearState, state } = await SingleAuth.useFileAuth(folder);
    
    const Neko = Baileys.makeWASocket({
      printQRInTerminal: true,
      logger: pino({ level: "silent" }),
      browser: ["Chrome (Linux)", "chrome", ""],
      auth: {
         creds: state.creds,
         keys: makeCacheableSignalKeyStore(state.keys, pino({ level: "silent" })),
      },
      msgRetryCounterCache,
    });
    store?.bind(Neko.ev);

   Neko.ev.on("creds.update", saveState);

    if (!Neko.authState?.creds?.registered) {
      const phoneNumber = owner?.replace(/[^0-9]/g,"");
      setTimeout(async () => {
        const code = await Neko.requestPairingCode(phoneNumber);
        console.log(`Pairing code: ${code}`);
      }, 3000);
    }

    Neko.GroupDb = new GroupDbFunctions();
    Neko.UserDb = new UserDbFunctions();
    Neko.Verify = new Verify(Neko);
    Neko.actionMap = await action(new Map());
    Neko.proUsers = await Neko.Verify.proLoad();
    Neko.banUsers = await Neko.Verify.banLoad();
    Neko.modUsers = await Neko.Verify.modLoad();
    Neko.silentUsers = await Neko.Verify.silentLoad();
    Neko.proGc = await Neko.Verify.proGcLoad();
    Neko.banGc = await Neko.Verify.banGcLoad();
    Neko.silentGc = await Neko.Verify.silentGcLoad();
    Neko.antilinkGc = await Neko.Verify.antilinkGcLoad();
    Neko.modUsers.push(...owner);
    console.log(`Loaded ${Neko.proUsers.length} Pro Users...!!`);
    console.log(`Loaded ${Neko.banUsers.length} Banned Users...!!`);
    console.log(`Loaded ${Neko.modUsers.length} Admin Users...!!`);
    console.log(`Loaded ${Neko.silentUsers.length} Silent Users...!!`);
    console.log(`Loaded ${Neko.proGc.length} Pro Groups...!!`);
    console.log(`Loaded ${Neko.banGc.length} Banned Groups...!!`);
    console.log(`Loaded ${Neko.silentGc.length} Silent Groups...!!`);
    console.log(`Loaded ${Neko.antilinkGc.length} Antilink Groups...!!`);
    console.log(`${Neko.actionMap.size} Commands Loaded...!!`);


    Neko.ev.on(
      "connection.update", 
      async (update) => {
        if(update.qr) {
          const qrcode = qr.imageSync(update.qr, { type: "png" });
          fs.writeFileSync("./qr.png", qrcode);
   let res = await scrape.imgbb("./qr.png")
        console.log("QR Code Uploaded....!!",res);
        }
        await WaConnection(update, StartNeko, clearState)
      
  });
    
    Neko.ev.on(
      "contacts.update",
      async (sender) => await checkCreateUser(sender, Neko)
    );
    
    Neko.ev.on(
      "messages.upsert",
      async (m) => await MessageHandle(m, Neko, Neko.actionMap)
    );
    
  } catch (error) {
    console.log(error);
  }
};

async function StartNeko() {
  try {
    await Promise.all([await setupBaileysSocket()]);
  } catch (error) {
    console.log(error);
    throw Error("Error during setup");
  }
}


app.get("/", (req, res) => {
  res.status(200).send("ok");
});

app.listen(PORT, () => {
  StartNeko()
  console.log(`Server Started on Port ${PORT}....!!`);
});
