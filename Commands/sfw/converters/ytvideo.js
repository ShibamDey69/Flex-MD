import axios from "axios";
export default {
  name: "ytv",
  alias: ["ytvideo"],
  power: ["member"],
  category: "converters",
  desc: "Download Youtube video",
  usage: `${prefix}ytv <URL>`,
  run: async (Neko, m, { args, fetchF, nul, from }) => {
    try {
      if (!args) return m.reply("edit",nul,"Input URL");
      if (!args.includes("youtu"))
        return m.reply("edit",nul,"Input valid youtube URL");
      let yt = await fetchF(
        `https://weeb-api-v3.onrender.com/yt?type=mp4&q=${args}`,
      );
      await m.reply("edit", nul, "Downloading...");
      if (yt.status !== 200) return await m.reply("edit", nul, yt.message);
      const res = await axios.get(yt.data.dlink);
      await Neko.sendMessage(from, {
        video: res.data,
        mimetype: "video/mp4",
        fileName: `Converted By Neko ${Math.floor(
          Math.random() * 10000
        ).toString(32)}.mp4`,
      });
    } catch (error) {
      m.reply("edit", nul, "*_Error!!_*");
    }
  },
};
