import { Sticker, StickerTypes } from "wa-sticker-formatter"; // ES6
import { downloadMediaMessage } from "@whiskeysockets/baileys";
import fs from "fs";
import os from "os";


export default {
  name: "sticker",
  alias: ["s"],
  description: "Converts image to sticker",
  category: "sfw",
  usage: "sticker",
  run: async (Neko,m, {args,from,messageType,nul}) => {
    try {
    m.reply("edit",nul,"Please wait..!!")
      if(messageType === "imageMessage" || messageType === "videoMessage"||messageType) {
        
        const buffer = await downloadMediaMessage(m, "buffer", {}, {
          reuploadRequest: Neko.updateMediaMessage,
        });
        const sticker = new Sticker(buffer, {
          pack: "Neko-MD",
          author: "shibam",
          type: StickerTypes.FULL,
          categories: ["🤩", "🎉"],
          id: "12345",
          quality: 5,
          background: "transparent",
        });
        const stickerBuffer = await sticker.build();
        
        await Neko.sendMessage(from,{
         sticker: stickerBuffer,
        },{quoted:m})
        console.log(stickerBuffer)
      } else {
      m.reply("edit",nul,"Please send an image or short video with caption"+prefix+"sticker/s")
        m.reply("text",null,messageType)
      }
    } catch (e) {
       m.reply("edit",nul,"*_Error!!_*")
    }
  }
}