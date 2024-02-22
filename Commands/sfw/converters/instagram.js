import axios from "axios";
export default {
  name: "instagram",
  alias: ["ig"],
  category: "fun",
  power:["member"],
  desc: "Download instagram media",
  usage: `${prefix}ig <URL>`,
  run: async (Neko, m, { args, fetchF,nul }) => {
    try {
      if (!args) return m.reply("edit",nul,'Input URL')
      if (!args.includes('instagram.com')) return m.reply("edit",nul,'Input valid instagram reel URL')
      let ig = await axios.get(`https://weeb-api-v3.onrender.com/ig?q=${args}`)

      await m.reply('edit', nul, 'Downloading...!')

      if (ig.status !== 200)
        return await m.reply('edit', nul, yt.message)
console.log(ig.data)
      let i = 0;
      while (i <ig.data.data.length) {
        if(!ig.data.data[i].type == 'video') {
        await m.reply("video", ig.data.data[i].url);
        } else {
        await m.reply("image", ig.data.data[i].url);
        }
        i++;
      }
    } catch (error) {
      console.log(error);
      m.reply("edit", nul,'*_Error!!_*');
    }
  }
}