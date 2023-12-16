export default {
  name: "ban",
  alias: ["banned"],
  category: "owner",
  description: "To ban any user or group use this command..!!",
  run: async (Neko, m, {  isGroup, args, groupId, quoted, isOwner, isMe,nul }) => {
    try {
      if ((isOwner === false) && (isMe === false)) return m.reply('edit', nul, `*_Only Owner Can Use this command...!_*`);
      let senderRegex = /^@\d{12}$/;
      if (isGroup) {
        let Group = await Neko.GroupDb.getGroup(groupId);
        let mess = `${Group.name} *_Group is already Banned from using this Bot..!!_*`;

        if (Group.isBanned && !(quoted || senderRegex.test(args?.split(" ")[0] || args))) return await m.reply('edit', null, mess)

        if (!Group.isBanned) {

          if (!quoted && !senderRegex.test(args)) {

            await Neko.GroupDb.setGcBanned(groupId, true);

            if (args.length > 5) {
              await Neko.GroupDb.setReason(groupId, args);
              return m.reply('edit', nul, `${Group.name} *_Group has been Banned from using this bot for this reason_* \n\n *_Reason:_* ${args}`);
            }

            return m.reply('edit', nul, `${Group.name} *_Group has been Banned from using this bot..!!_*`);
          }
        }
      }

      if (isGroup && (quoted || senderRegex.test(args?.split(" ")[0] || args))) {

        let user = quoted?.split("@")[0] || args.split("@")[1];

        let sender = await Neko.UserDb.getUser(user);
        let msg = `@${user} *_is already Banned from using this Bot..!!_*`
        let mnton = senderRegex.test(args) ? `${args.split("@")[1]}@s.whatsapp.net` : quoted
        if (sender.isBanned) return m.reply('mention', mnton, msg);

        if (!sender.isBanned) {
          await Neko.UserDb.setBanned(user, true);
          let mgs = `@${user} *_has been Banned from using this bot_*`
          return m.reply('mention', mnton, mgs);
        }
      }

      if (!isGroup) {
        if (!quoted) return m.reply('edit', nul, '*_please tag/quoted user to UnBan...!_*');
        let user = quoted.split("@")[0]

        let sender = await Neko.UserDb.getUser(user);

        let mes = `@${user} *_is already Banned from using this bot...!!_*`;
        if (sender.isBanned) return m.reply('mention', `${user}@s.whatsapp.net`, mes);

        if (!sender.isBanned) {
          let mess = `@${user} *_have been Banned from using this bot...!_*`
          await Neko.UserDb.setBanned(user, true);
          return m.reply('mention', `${user}@s.whatsapp.net`, mess);
        }
      }
    } catch (error) {
      m.reply("edit", nul, '*_Error!!_*');
    }
  }
}