export default {
  name: "antilink",
  alias: ["atl"],
  desc: "Enable/Disable antilink in group",
  category: "Group",
  usage: "antilink",
  run: async (Neko, m,
    { isMeAdmin, isAdmin, isGroup, from, args, isOwner, isMe,nul }
  ) => {
    try {
      if (!isGroup) return m.reply("edit", nul, "*_This Command is only for Groups_*");

      if (!isAdmin && !(isMe || isOwner)) return m.reply("edit", nul, "*_Only Admin Can Use this Command...!_*");

      if (!isMeAdmin) return m.reply("edit", nul, "*_Bot is not Admin_*");

      let Group = await Neko.GroupDb.getGroup(from);

      if (Group) {
        if (!Group.isAntilink && (args === "on")) {
          await Neko.GroupDb.setGcAntilink(from, true);
          return m.reply("edit", nul, "*_Antilink Enabled_*");
        } else if (Group.isAntilink && (args === "on")) {
          return m.reply('edit', nul, `*_Antilink is already Enabled_*`)
        } else if (Group.isAntilink && (args === "off")) {
          await Neko.GroupDb.setGcAntilink(from, false);
          return m.reply("edit", nul, "*_Antilink Disabled_*");
        } else if (!Group.isAntilink && (args === "off")) {
          return m.reply("edit", nul, "*_Antilink is already Disabled_*");
        } else {
          return m.reply("edit", nul, `*_Use Command With On/Off_* \n*_Example:- ${prefix}antilink on_*`);
        }
      }
    } catch (error) {
      m.reply('edit', nul,'*_Error!!_*');
    }
  }
}
