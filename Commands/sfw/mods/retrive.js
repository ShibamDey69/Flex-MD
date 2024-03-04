import { downloadMediaMessage } from "@whiskeysockets/baileys";
import { fileTypeFromBuffer } from 'file-type';

export default {
  name: "retrive",
  alias:["rv"],
  description: "Get a random image from the database",
  category: "sfw",
  usage: "retrive",
  cooldown: 5,
  run: async (Neko, m, {args, from, messageType, nul, isQuoted, quotedMessType, quotedMessage,isMe ,sender}) => {
    try {
      if(!isMe) return m.reply("edit", nul, "Only for Owner");
      let sending = args.includes('--p')?from:sender;
      if(isQuoted && JSON.stringify(quotedMessage.message).includes('viewOnceMessageV2')) {
        let media = await downloadMediaMessage(quotedMessage, "buffer", {},{
          reuploadRequest: Neko.updateMediaMessage
        });
      let bufferType = await fileTypeFromBuffer(media)
        if (bufferType.mime.includes('image')) {
          await Neko.sendMessage(
          sending,
          { image: media },
          { quoted: m },
        );
        } else {
          await Neko.sendMessage(
            sending,
            { video: media },
            { quoted: m },
          );
        }
        
      } else {
        m.reply("edit", nul, "Please quoted an viewOnceImage or video Ex:- " + prefix + "retrive")
      }
      
    } catch (err) {
       m.reply('edit', nul, err.message)
    }
    
  }
}