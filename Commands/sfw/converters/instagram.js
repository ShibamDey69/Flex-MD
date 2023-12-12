export default {
  name: "instagram",
  alias: ["ig"],
  category: "fun",
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

      await m.reply("video", ig.data[0])
    } catch (error) {
      m.reply("edit", nul,'*_Error!!_*');
    }
  }
}