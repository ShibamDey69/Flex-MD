import { DisconnectReason } from "@whiskeysockets/baileys";
import { Boom } from "@hapi/boom";

export default async function WaConnection(update, StartNeko, clearState) {
  const { connection, lastDisconnect } = update;

  // If connection is open then send a message
  if (connection === "open") {
    console.log(`Connected to WhatsApp...!!, Master !!!`);
  }

  if(connection === "connecting") {
    console.log(`Connecting to Whatsapp...!!`);
  }

  // If connection is closed then show an error in console
  if (connection === "close") {
    if (
      lastDisconnect?.error?.output?.statusCode == DisconnectReason.loggedOut
    ) {
      console.log("Logged out...");
      clearState();
      process.exit(0);
      //pm2.stop(`${this.config.session}`);
    } else {
      if (
        lastDisconnect?.error?.output?.statusCode !== DisconnectReason.loggedOut
      ) {
        console.log("[Reconnecting Again...!]");
        setTimeout(() => StartNeko(), 3000);
      } else {
        console.log(["Disconnected...!"]);
        console.log("[Deleting session and restarting...!]");
        clearState();
        console.log("[Session deleted successfully....!]");
        console.log("[Starting...!]");
        setTimeout(() => StartNeko(), 3000);
      }
    }
  }
}
