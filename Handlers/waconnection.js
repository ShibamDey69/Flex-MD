import { DisconnectReason } from '@whiskeysockets/baileys'
import { Boom } from '@hapi/boom';

export default async function WaConnection(update, StartNeko,clearState) {

  const { connection, lastDisconnect } = update;

  // If connection is open then send a message 
  if (connection === "open") {
    console.log(`Connected to WhatsApp...!!, Master !!!`);
  }

  // If connection is closed then show an error in console
  if (connection === "close") {
    let reason = new Boom(lastDisconnect?.error)?.output.statusCode;
    if (reason === DisconnectReason.connectionClosed) {
      console.log("[Connection closed, reconnecting....!]");
      StartNeko();
    } else if (reason === DisconnectReason.connectionLost) {
      console.log("[Connection Lost from Server, reconnecting....!]");
      StartNeko();
    } else if (reason === DisconnectReason.loggedOut) {
      clearState();
      console.log(
        `[Device Logged Out, Please Try to Login Again....!]`
      );
      clearState();
      StartNeko()
    } else if (reason === DisconnectReason.restartRequired) {
      console.log("[Server Restarting....!]");
      StartNeko();
    } else if (reason === DisconnectReason.timedOut) {
      console.log("[Connection Timed Out, Trying to Reconnect....!]");
      StartNeko();
    } else if (reason === DisconnectReason.badSession) {
      console.log("[BadSession exists, Trying to Reconnect....!]");
      clearState()
      StartNeko()
    } else if (reason === DisconnectReason.connectionReplaced) {
      console.log(`[Connection Replaced, Trying to Reconnect....!]`)
      clearState()
      StartNeko()
    } else {
      console.log(
        `[Server Disconnected: Maybe Your WhatsApp Account got banned....!]`
      );
      StartNeko()
    }
  }
}
