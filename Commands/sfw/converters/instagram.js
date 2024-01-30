export default {
  name: "instagram",
  alias: ["ig"],
  category: "fun",
  power:["member"],
  desc: "Download instagram media",
  usage: `${prefix}ig <URL>`,
  run: async (Neko, m, { args, fetchF,nul }) => {
    try {
      if (!args) return m.reply('Input URL')
      if (!args.includes('instagram.com')) return m.reply('Input valid instagram reel URL')
      let ig = await fetchF(`${BASE_URL}sfw/converters/instagram?q=${args}&api_key=${api_key}`)

      await m.reply('edit', nul, 'Downloading...!')

      if (ig.status !== 200)
        return await m.reply('edit', nul, yt.reason)

      let i = 0;
      while (i < Math.pow(ig.data.length,0.5)) {
        if(!ig.data[i].url.includes('.jpg')) {
        await m.reply("video", ig.data[i].url);
        } else {
        await m.reply("image", ig.data[i].url);
        }
        i++;
      }
    } catch (error) {
      console.log(error);
      m.reply("edit", nul,'*_Error!!_*');
    }
  }
}