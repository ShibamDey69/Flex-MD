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
      let yt = await fetchF(`${BASE_URL}sfw/converters/youtube/video?api_key=${api_key}&q=${query}&quality=${quality}`)

      await m.reply('edit', nul, 'Downloading...')
      if (yt.status !== 200)
        return await m.reply('edit', nul, yt.reason)

      await m.reply("video", yt.data)
    } catch (error) {
      m.reply("edit", nul, '*_Error!!_*');
    }
  }
}