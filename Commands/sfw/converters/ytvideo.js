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
      
      let quality =  args.split('--')[1]||'360p';
      let yt = await fetchF(`https://weeb-api-v3.onrender.com/yt?type=mp4&q=${args}&quality=${quality}`)

      await m.reply('edit', nul, 'Downloading...')
      if (yt.status !== 200)
        return await m.reply('edit', nul, yt.message)
      await m.reply("video", yt.data.dlink)
    } catch (error) {
      m.reply("edit", nul, '*_Error!!_*');
    }
  }
}