import util from 'util';
export default {
  name: "eval",
  aliases: ["ev"],
  category: "Mods",
  description: "Evaluate a piece of code",
  usage: "eval <code>",
  run: async (Neko, m, {nul,mentionTag, name, sender, gcMeta, gcName, args, 
from,cmdName, body, quoted, text, viewonce, isGroup,
isQuoted, isMe, messageType, fetchF,Admins,isMeAdmin,
        isAdmin,isOwner,groupId,participants}) => {
    if (!isMe) return;
    try {
      let code = args;
      if (!code) return m.reply('edit',nul,"No code provided");
      let evaled = await eval(code);
      if (typeof evaled !== "string") evaled = await util.inspect(evaled);
      await m.reply('text',null,evaled);
    } catch (err) {
    m.reply('edit',nul,`${err}`);
    }
  },
}