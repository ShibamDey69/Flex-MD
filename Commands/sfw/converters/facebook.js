export default {
  name: "facebook",
  alias: ["fb"],
  category: "fun",
  power:["member"],
  desc: "Download facebook media",
  usage: `${prefix}fb <URL>`,
  run: async (Neko, m, { args, fetchF, nul }) => {
    try {
      if (!args) return m.reply("Input URL");
      if (!args.includes("facebook.com") && !args.includes("fb"))
        return m.reply("Input valid facebook reel URL");
      let fb = await fetchF(
        `https://weeb-api-v3.onrender.com/fb?q=${args}`,
      );
      await m.reply("edit", nul, "Downloading...");
      if (fb.status !== 200) return await m.reply("edit", nul, fb.message);
      let fbdata = fb.data.HD??fb.data.SD
      
      await m.reply("video", fbdata);
    } catch (error) {
      m.reply("edit", nul, "*_Error!!_*");
    }
  },
};
