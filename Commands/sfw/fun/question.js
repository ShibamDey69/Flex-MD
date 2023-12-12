export default {
  name: "question",
  alias: ["ask"],
  category: "fun",
  desc: "Bot will Ask a question ",
  run: async (Neko, m, { fetchF ,nul}) => {
    try {
      let neko = await fetchF(`${BASE_URL}sfw/fun/question?api_key=${api_key}`);
      if (neko.status !== 200) return m.reply("edit", nul, neko.reason);
      await m.reply("edit", nul, `*_Question:_*  ${neko.data.question}\n\n`);
    } catch (error) {
      m.reply("edit", nul,'*_Error!!_*');
    }
  }
}