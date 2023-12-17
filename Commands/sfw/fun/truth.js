export default {
  name: "truth",
  alias: ["t"],
  power:["member"],
  category: "fun",
  description: "Truth and Dare Game...this is truth command..!!",
  usage: 1,
  run: async (Neko, m, { fetchF,nul }) => {
    try {
      let truth = await fetchF(`${BASE_URL}sfw/fun/truth?api_key=${api_key}`);
      if (truth.status !== 200) return m.reply("edit", nul, truth.reason);
      await m.reply("edit", nul, `*_Truth :_*   ${truth.data.truth}`);
    } catch (error) {
      m.reply("edit", nul, '*_Error!!_*');
    }
  }
}