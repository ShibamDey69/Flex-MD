export default {
  name: "facebook",
  alias: ["fb"],
  category: "fun",
  desc: "Download facebook media",
  usage: `${prefix}fb <URL>`,
  run: async (Neko, m, { args, fetchF, nul }) => {
    try {
      if (!args) return m.reply("Input URL");
      if (!args.includes("facebook.com") && !args.includes("fb"))
        return m.reply("Input valid facebook reel URL");
      let fb = await fetchF(
        `${BASE_URL}sfw/converters/facebook?api_key=${api_key}&q=${args}`,
      );
      await m.reply("edit", nul, "Downloading...");
      if (fb.status !== 200) return await m.reply("edit", nul, yt.reason);

      let fbdata =
        fb.data.urls[0].quality == "720p (HD)"
          ? fb.data.urls[1].url
          : fb.data.urls[0].url;
      await m.reply("video", fbdata);
    } catch (error) {
      m.reply("edit", nul, "*_Error!!_*");
    }
  },
};
