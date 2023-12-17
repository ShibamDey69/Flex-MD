export default {
  name: "yta",
  alias: ["ytaudio"],
  power:["member"],
  category: "converters",
  desc: "Download Youtube video",
  usage: `${prefix}ytv <URL>`,
  run: async (Neko, m, { args, fetchF,nul }) => {
    try {
      if (!args) return m.reply('Input URL')
      if (!args.includes('youtu')) return m.reply('Input valid facebook reel URL')
      let yt = await fetchF(`${BASE_URL}sfw/converters/youtube/audio?api_key=${api_key}&q=${args}`)
      await m.reply('edit', nul, 'Downloading...')

      if (yt.status !== 200)
        return await m.reply('edit', nul, yt.reason)
      await m.reply("audio", yt.data)
    } catch (error) {
      m.reply("edit", nul, '*_Error!!_*');
    }
  }
}