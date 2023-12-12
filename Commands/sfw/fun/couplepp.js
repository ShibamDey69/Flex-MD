export default {
  name: "couplepp",
  alias: ["couplespp"],
  category: "fun",
  desc: "Sends a random couple pp pic",
  run: async (Neko, m, { fetchF,nul }) => {
    try {
      let pp = await fetchF(`${BASE_URL}sfw/fun/couplepp?api_key=${api_key}`)
      if (pp.status !== 200)
        return await m.reply('edit', nul, yt.reason)

      let mp = pp.data.couplepp.male
       await m.reply("image",null, mp);
    let fm = `${pp.data.couplepp.female}`
     return await m.reply("image", null,fm);
    } catch (error) {
      console.log(error)
      m.reply('edit', nul, '*_Error!!_*')
    }
  }
}
