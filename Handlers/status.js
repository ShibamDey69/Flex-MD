import { downloadMediaMessage } from "@whiskeysockets/baileys";

export default async function statusCollector(Neko, m, { name, messageType }) {
  try {
    switch (messageType) {
      case "audioMessage":
        let buffer37 = await dlMessage(m.message.audioMessage, "audio");

        let aud = await Neko.sendMessage(Neko.user.id, {
          audio: buffer37,
          mimetype: "audio/mpeg",
          fileName: `Converted By Neko ${name}.mp3`,
        });
        await Neko.sendMessage(
          Neko.user.id,
          { text: `*Status:* from *${name}*` },
          { quoted: aud },
        );
        break;
      case "videoMessage":
        const buffer2 = await downloadMediaMessage(
          m,
          "buffer",
          {},
          {
            reuploadRequest: Neko.updateMediaMessage,
          },
        );

        await Neko.sendMessage(Neko.user.id, {
          video: buffer2,
          caption:
            `*Status:* "${m.message.videoMessage?.caption}" from *${name}*` ||
            `*Status:* From ${name}`,
        });
        break;
      case "imageMessage":
        const buffer3 = await downloadMediaMessage(
          m,
          "buffer",
          {},
          {
            reuploadRequest: Neko.updateMediaMessage,
          },
        );
        await Neko.sendMessage(Neko.user.id, {
          image: buffer3,
          caption:
            `*Status:* "${m.message.imageMessage?.caption}" from *${name}*` ||
            `*Status:* From ${name}`,
        });
        break;
      case "extendedTextMessage":
        Neko.sendMessage(Neko.user.id, {
          text: `*Status:* "${m.message.extendedTextMessage.text}" from *${name}*`,
        });
        break;
      default:
        break;
    }
  } catch (error) {
    console.log(error);
    return Neko.sendMessage(Neko.user.id, {
      text: `An Error Occured!! Retry Please!!`,
    });
  }
}
