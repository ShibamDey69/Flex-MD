export default {
  name: "dare",
  alias: ["d"],
  category: "fun",
  description: "Truth and Dare Game...this is dare command..!!",
  usage: 1,
  run: async (Neko, m, { fetchF,from,nul }) => {
    try {
      let dare = await fetchF(`${BASE_URL}sfw/fun/dare?api_key=${api_key}`);
     
      if (dare.status !== 200) return m.reply("edit", nul, dare.reason);
      await m.reply("edit", nul, `*_Dare :_*   ${dare.data.dare}`);
    } catch (error) {
  await m.reply("edit", nul, '*_Error!!_*');
    }
  }
}