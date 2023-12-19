import Baileys from "@whiskeysockets/baileys";
import pino from "pino";
import mongoose from "mongoose";
import express from "express";
const app = express();
import fs from "node:fs";
import WaConnection from "./Handlers/waconnection.js";
import MessageHandle from "./Handlers/message.js";
import action from "./utils/Commands.js";
import Verify from "./utils/verifyUser.js";
import { GroupDbFunctions, UserDbFunctions } from "./utils/dbFunctions.js";
import Group from "./models/groups.js";
import User from "./models/user.js";
import AuthenticationFromFile from "./utils/authFile.js";
import checkCreateUser from './utils/checkCreateUser.js';
let folder = "Auth-Info";

global.BASE_URL = `https://weeb-api-neko.onrender.com/weeb/api/`;
global.prefix = "!";
global.owner = process.env.OWNER || "919609421243";
global.NUMBER = process.env.NUMBER || "917047584741";
global.waitMesaage = "*_Wait A Minute_*";
global.api_key = "mta3elttdphm8ryd";
global.DB = process.env.MONGO_DB;

const PORT = process.env.PORT || 3021;

const setupDatabase = async () => {
  try {
    if (!fs.existsSync(folder)) {
      fs.mkdirSync(folder);
      console.log(`Auth info folder created....!!`);
    }

    if (!DB) {
      throw new Error(
        "Please add your MongoDB URL in the .env file or secrets...!",
      );
    }

    await mongoose.connect(DB);
    console.log("Connected to DB....!!");
  } catch (error) {
    console.error("Error setting up database:", error);
  }
};

const setupBaileysSocket = async () => {
  try {
    const SingleAuth = new AuthenticationFromFile(folder);
    const { saveState, clearState, state } =
      await SingleAuth.useFileAuth(folder);

    const Neko = Baileys.makeWASocket({
      printQRInTerminal: false,
      logger: pino({ level: "silent" }),
      browser: ["Chrome (Linux)", "chrome", ""],
      auth: state,
    });

    console.log(`Connecting to Whatsapp...!!`);

    const actionMap = await action(new Map());
    if (actionMap) console.log(`${actionMap.size} Commands Loaded....!!`);

    if (!Neko.authState?.creds?.registered) {
      const phoneNumber = NUMBER?.replace(/[^0-9]/g, "");

      setTimeout(async () => {
        const code = await Neko.requestPairingCode(phoneNumber);
        console.log(`Pairing code: ${code}`);
      }, 3000);
    }

    Neko.GroupDb = new GroupDbFunctions(Group);
    Neko.UserDb = new UserDbFunctions(User);
    Neko.Verify = new Verify(Neko);
    Neko.proUsers = await Neko.Verify.proLoad();
    Neko.banUsers = await Neko.Verify.banLoad();
    Neko.adminUsers = await Neko.Verify.adminLoad();
    console.log(`Loaded ${Neko.proUsers.length} Pro Users...!!`);
    console.log(`Loaded ${Neko.banUsers.length} Banned Users...!!`);
    console.log(`Loaded ${Neko.adminUsers.length} Admin Users...!!`);

    
    Neko.ev.on("creds.update", saveState);

    Neko.ev.on("connection.update", async (update) =>
     await WaConnection(update, StartNeko, clearState),
    );
    Neko.ev.on("chats.update", async (update) => {
      console.log("gro",update);
    })
    Neko.ev.on('contacts.update', async (sender) => await checkCreateUser(sender,Neko))
    Neko.ev.on("messages.upsert", async (m) =>
      await MessageHandle(m, Neko, actionMap),
    );
  } catch (error) {
    console.error(error);
    throw Error("Error setting up Baileys Socket");
  }
};

async function StartNeko() {
  try {
    await Promise.all([await setupDatabase(), await setupBaileysSocket()]);
  } catch (error) {
    console.log(error);
    throw Error("Error during setup");
  }
}

StartNeko();

app.get("/", (req, res) => {
  res.status(200).send("ok");
});

app.listen(PORT, () => {
  console.log(`Server Started on Port ${PORT}....!!`);
});
