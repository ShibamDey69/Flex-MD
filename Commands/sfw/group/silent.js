export default {
  name: "silent",
  alias: ["silentgc"],
  desc: "Enable/Disable Silent in group",
  category: "Group",
  usage: "antilink",
  run: async (Neko, m,
    { isAdmin, isGroup, GroupDb, from, args, isMe, isOwner,nul }
  ) => {
    try {
      if (!isGroup) return m.reply("edit", nul, "*_This Command is only for Groups_*");

      if (!isAdmin && !(isMe || isOwner)) return m.reply("edit", nul, "*_Only Admin Can Use this Command...!_*");

      let Group = await GroupDb.getGroup(from);

      if (Group) {
        if (!Group.isSilent && (args === "on")) {
          await GroupDb.setGcSilent(from, true);
          return m.reply("edit", nul, "*_Silent Enabled_*");
        } else if (Group.isSilent && (args === "on")) {
          return m.reply('edit', nul, `*_Silent is already Enabled_*`)
        } else if (Group.isSilent && (args === "off")) {
          await GroupDb.setGcSilent(from, false);
          return m.reply("edit", nul, "*_Silent Disabled_*");
        } else if (!Group.isSilent && (args === "off")) {
          return m.reply("edit", nul, "*_Silent is already Disabled_*");
        } else {
          return m.reply("edit", nul, `*_Use Command With On/Off_* \n*_Example:- ${prefix}silent on_*`);
        }
      }
    } catch (error) {
      m.text('edit', nul, '*_Error!!_*');
    }
  }
}
