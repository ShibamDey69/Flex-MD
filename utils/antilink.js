
export default async function AntilinkFunc(Neko,m,sender,from,text,isMeAdmin) {
  try {

    if(!isMeAdmin) return m.reply('text',null, `*_Bot is not admin...!_*`)
    let linkGcCode = await Neko.groupInviteCode(from);

    let gcLink = `https://chat.whatsapp.com/${linkGcCode}`;
    if(!gcLink.includes(text)) 
    {
      await Neko.sendMessage(
            from,
            {
              delete: {
                remoteJid: from,
                fromMe: false,
                id: m.key.id,
                participant: sender,
              },
            },
            {
              quoted: m,
            }
          );
      await m.reply('text',null, `*_Antilink Activated...!_*\n
*_You can't send link to this group...!_*\n
*_So We Are Currently Removing You...!_*`);
     return await Neko.groupParticipantsUpdate(from, [sender], "remove");
      
    }
  } catch (error) {
    console.log(error)
    throw new Error(error)
  }
}
