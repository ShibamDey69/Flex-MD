import Baileys,{
  useMultiFileAuthState,
} from '@whiskeysockets/baileys'
import pino from 'pino';
import mongoose from 'mongoose';
import express from 'express';
const app = express()
import fs from 'node:fs';
import WaConnection from "./Handlers/waconnection.js";
import MessageHandle from './Handlers/message.js';
import action from './utils/Commands.js';
let folder = "./Auth-Info";
global.Nekoname = process.env.NAME || "Neko";
global.BASE_URL = `https://weeb-api-neko.onrender.com/weeb/api/`;
global.prefix = "!";
global.owner = process.env.OWNER || "917047584741";
global.NUMBER = process.env.NUMBER || "919609421243";
global.waitMesaage = "*_Wait A Minute_*";
global.DB = process.env.MONGO_DB;

const PORT = process.env.PORT || 3000;

const setupDatabase = async () => {
  try {
    if (!fs.existsSync(folder)) {
      fs.mkdirSync(folder);
      console.log(`Auth info folder created....!!`);
    }

    if (!DB) {
      throw new Error('Please add your MongoDB URL in the .env file or secrets...!');
    }

    await mongoose.connect(DB);
    console.log('Connected to DB....!!');
  } catch (error) {
    console.error('Error setting up database:', error);
  }
};

const setupBaileysSocket = async () => {
  try {
    const { state, saveCreds } = await useMultiFileAuthState(folder);

    const Neko = Baileys.makeWASocket({
      printQRInTerminal: false,
      logger: pino({ level: 'silent' }),
      browser: ['Chrome (Linux)', 'chrome', ''],
      auth: state,
    });

    console.log(`Connecting to Whatsapp...!!`);

    const actionMap = await action(new Map());
    if (actionMap) console.log(`${actionMap.size} Commands Loaded....!!`);

    if (!Neko.authState.creds.registered) {
      const phoneNumber = process.env.NUMBER.replace(/[^0-9]/g, '');

      setTimeout(async () => {
        const code = await Neko.requestPairingCode(phoneNumber);
        console.log(`Pairing code: ${code}`);
      }, 3000);
    }

    Neko.ev.on('creds.update', saveCreds);
    Neko.ev.on('connection.update', async (update) => WaConnection(update, StartNeko));
    Neko.ev.on('messages.upsert', async (m) => MessageHandle(m, Neko, actionMap));
  } catch (error) {
    console.error('Error setting up Baileys socket:', error);
  }
};

  async function StartNeko  () {
  try {
    await Promise.all([await setupDatabase(), await setupBaileysSocket()]);
  } catch (error) {
    console.error('Error during setup:', error);
  }
};

// Run initial setup concurrently
  StartNeko();

app.get('/', (req, res) => {
  res.status(200).send('ok');
});

app.listen(PORT, () => {
  console.log(`Server Started on Port ${PORT}....!!`);
});
