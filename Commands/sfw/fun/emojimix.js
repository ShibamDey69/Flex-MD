import emojiMixer from "emoji-mixer";
import axios from "axios";
import { Sticker, StickerTypes } from "wa-sticker-formatter"; 
export default {
  name:"emojimix",
  alias:["emix"],
  category:"sfw",
  desc:"Mixes two emojis",
  react:"😊",
  run: async(Neko,m,{args,nul,from}) => {
    try {
    if(!args.split("+")[0]) return await m.reply("edit",nul,"Please provide the first emoji")
    if(!args.split("+")[1]) return await m.reply("edit",nul,"Please provide the second emoji")

      let res = await emojiMixer(args.split("+")[0],args.split("+")[1]);

      let { data } = await axios.get(res, {
        responseType: "arraybuffer",
      })

              let sticker = new Sticker(data, {
          pack: "Neko-MD",
          author: "shibam",
          type: StickerTypes.FULL,
          categories: ["🤩", "🎉"],
          id: "12345",
          quality: 3,
          background: "transparent",
        });
        let stickerBuffer = await sticker.toBuffer();

        await Neko.sendMessage(from, { sticker: stickerBuffer }, { quoted: m });

    } catch (error) {
      m.reply("edit",nul,"Error"+error)
      console.log(error);
    }
  }
}