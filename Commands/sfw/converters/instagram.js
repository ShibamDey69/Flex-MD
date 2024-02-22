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
      let ig = await fetchF(`https://weeb-api-v3.onrender.com/ig?q=${args}`)

      await m.reply('edit', nul, 'Downloading...!')

      if (ig.status !== 200)
        return await m.reply('edit', nul, yt.message)

      let i = 0;
      while (i <ig.data.length) {
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