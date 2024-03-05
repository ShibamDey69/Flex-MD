import { Sticker, StickerTypes } from "wa-sticker-formatter"; // ES6
import { downloadMediaMessage } from "@whiskeysockets/baileys";
import Scraper from "neko_img_uploader";
import axios from "axios";
const scrape = new Scraper();

export default {
  name: "sticker",
  alias: ["s"],
  description: "Converts image to sticker",
  category: "sfw",
  usage: "sticker",
  run: async (
    Neko,
    m,
    { args, from, messageType, nul, isQuoted, quotedMessType, quotedMessage },
  ) => {
    try {
      m.reply("edit", nul, "Please wait..!!");

      if (
        (isQuoted && quotedMessType === "imageMessage") ||
        quotedMessType === "videoMessage"
      ) {
        let media = await downloadMediaMessage(
          quotedMessage,
          "buffer",
          {},
          {
            reuploadRequest: Neko.updateMediaMessage,
          },
        );
        async function argsIs() {
          let res = await scrape.imgbb(media);
          let api = `https://api.memegen.link/images/custom/-/${args}.png?background=${res}`;
          let { data } = await axios.get(api);
          return data;
        }
        media = args ? await argsIs() : media;
        let sticker = new Sticker(media, {
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
      } else {
        if (messageType === "imageMessage" || messageType === "videoMessage") {
          const media = await downloadMediaMessage(
            m,
            "buffer",
            {},
            {
              reuploadRequest: Neko.updateMediaMessage,
            },
          );
          async function argsIs() {
            let res = await scrape.imgbb(media);
            let api = `https://api.memegen.link/images/custom/-/${args}.png?background=${res}`;
            let { data } = await axios.get(api);
            return data;
          }
          media = args ? await argsIs() : media;
          const sticker = new Sticker(media, {
            pack: "Neko-MD",
            author: "shibam",
            type: StickerTypes.FULL,
            categories: ["🤩", "🎉"],
            id: "12345",
            quality: 5,
            background: "transparent",
          });
          const stickerBuffer = await sticker.build();

          await Neko.sendMessage(
            from,
            {
              sticker: stickerBuffer,
            },
            { quoted: m },
          );
        } else {
          m.reply(
            "edit",
            nul,
            "Please send an image or short video with caption" +
              prefix +
              "sticker/s",
          );
        }
      }
    } catch (e) {
      m.reply("edit", nul, "*_Error!!_*");
    }
  },
};
