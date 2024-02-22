export default {
  name: "ytv",
  alias: ["ytvideo"],
  power:["member"],
  category: "converters",
  desc: "Download Youtube video",
  usage: `${prefix}ytv <URL>`,
  run: async (Neko, m, { args, fetchF,nul }) => {
    try {
      if (!args) return m.reply('Input URL')
      if (!args.includes('youtu')) return m.reply('Input valid facebook reel URL')
      let query = args.includes(" ") ? args.split(' ')[0]:args;
      let quality = args.includes(" ") ? args.split(' ')[1]:'360p';
      let yt = await fetchF(`https://weeb-api-v3.onrender.com/telesticker?type=mp4q=${args}`)

      await m.reply('edit', nul, 'Downloading...')
      if (yt.status !== 200)
        return await m.reply('edit', nul, yt.message)

      await m.reply("video", yt.data.result[0].url)
    } catch (error) {
      m.reply("edit", nul, '*_Error!!_*');
    }
  }
}