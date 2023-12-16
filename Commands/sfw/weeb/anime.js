export default {
  name: "anime",
  description: "usage of anime Commands...!",
  usage: "anime",
  run: async (Neko, m,{args,cmdName}) => {
try {
 const cmd_obj = {
   anime: `/search?api_key=${api_key}&q=${args}`,
   animeid: `/info/${args}?api_key=${api_key}`,
   epid: `/episode/${args}?api_key=${api_key}`,
 }
    } catch (error) {
     await m.reply('edit',nul,'*_Error!!_*')
    }
  }
}