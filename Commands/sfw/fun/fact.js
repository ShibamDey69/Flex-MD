export default {
  name: "fact",
  alias: ["facts"],
  category: "fun",
  description: "Tell us A random fact..!!",
  usage: 1,
  run: async (Neko, m, { fetchF,nul }) => {
    try {
      let fact = await fetchF(`${BASE_URL}sfw/fun/fact?api_key=${api_key}`);
      if (fact.status !== 200) return m.reply("edit", nul, fact.reason);
      await m.reply("edit", nul, `*_Fact :_*   ${fact.data.fact}`);
    } catch (error) {
      m.reply("edit", nul,'*_Error!!_*');
    }
  }
}