import { Sticker, StickerTypes } from "wa-sticker-formatter"; // ES6
import TelegramScraper from "../../../scraper/scraper.js";
import fs from "fs";
import os from "os";
import axios from "axios";
const tele = new TelegramScraper({
  token: "6802338431:AAEFn2kAneoQILDntVjbpxl-poWwgQDsMFQ",
});

export default {
  name: "tele_stickers",
  alias: ["tele_sticker", "ts"],
  description: "Telegram Sticker Commands",
  category: "sfw",
  usage: "tele_stickers",
  run: async (Neko, m, { fetchF, nul, args, from }) => {
    try {
      let sticker_pack = await axios.get(
        `https://weeb-api-v3.onrender.com/telesticker?q=${
          !args.includes("--")?args: args.split("--")[0] ?? args
        }`,
        {
          responseType: "json",
        },
      );

      let sticker_pack_data = sticker_pack.data.data.stickers;
      //console.log(sticker_pack_data)
      for (let i = 0; i < sticker_pack_data.length; i++) {
        let res = await axios.get(sticker_pack_data[i], {
          responseType: "arraybuffer",
        });
        
        
        if (args.includes("--image")) {
          await Neko.sendMessage(
            from,
            {
              image: res.data,
            },
            { quoted: m },
          );
        } else {
          fs.writeFileSync(os.tmpdir() + `/sticker${i}.webp`, res.data);
        let da = fs.readFileSync(os.tmpdir() + `/sticker${i}.webp`);
          
          let sticker = new Sticker(da, {
          pack: args,
          author: "NekoBot",
          type: StickerTypes.FULL,
          categories: ["🤩", "🎉"],
          id: "12345",
          quality: 75,
          background: "transparent",
        });
          await Neko.sendMessage(
            from,
            { sticker: await sticker.build() },
            { quoted: m },
          );
    fs.unlinkSync(os.tmpdir() + `/sticker${i}.webp`);
        }
      }
    } catch (error) {
      console.log(error);
      m.reply("edit", nul, "*_Error!!_*");
    }
  },
};
