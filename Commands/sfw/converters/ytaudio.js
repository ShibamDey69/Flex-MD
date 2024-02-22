import axios from "axios";
export default {
  name: "yta",
  alias: ["ytaudio"],
  power: ["member"],
  category: "converters",
  desc: "Download Youtube video",
  usage: `${prefix}ytv <URL>`,
  run: async (Neko, m, { args, fetchF, nul, from }) => {
    try {
      if (!args) return m.reply("edit",nul,"Input URL");
      if (!args.includes("youtu"))
        return m.reply("edit",nul,"Input valid youtube URL");
      let yt = await axios.get(
        `https://weeb-api-v3.onrender.com/yt?type=mp3&q=${args}`,
      );
console.log(yt.data.data.dlink);
      await m.reply("edit", nul, "Downloading...");
      if (yt.data.status !== 200) return await m.reply("edit", nul, yt.data.message);

      const res = await axios.get(yt.data.data.dlink);

      await Neko.sendMessage(from, {
        audio: res.data,
        mimetype: "audio/mpeg",
        fileName: `Converted By Neko ${Math.floor(
          Math.random() * 10000
        ).toString(32)}.mp3`,
        ptt: true,
      });
    } catch (error) {
      m.reply("edit", nul, "*_Error!!_*");
    }
  },
};
