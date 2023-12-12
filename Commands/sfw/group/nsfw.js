export default {
  name: "nsfw",
  alias: ["nsfw"],
  desc: "Enable/Disable nsfw in group",
  category: "Group",
  usage: `${prefix}nsfw on`,
  run: async (Neko, m,
    { isAdmin, isGroup, GroupDb, from, args, isMe, isOwner,nul }
  ) => {
    try {
      if (!isGroup) return m.reply("edit", nul, "*_This Command is only for Groups_*");

      if (!isAdmin && !(isMe || isOwner)) return m.reply("edit", nul, "*_Only Admin Can Use this Command...!_*");

      let Group = await GroupDb.getGroup(from);

      if (Group) {
        if (!Group.isNsfw && (args === "on")) {
          await GroupDb.setGcNsfw(from, true);
          return m.reply("edit", nul, "*_Nsfw Enabled_*");
        } else if (Group.isNsfw && (args === "on")) {
          return m.reply('edit', nul, `*_Nsfw is already Enabled_*`)
        } else if (Group.isNsfw && (args === "off")) {
          await GroupDb.setGcNsfw(from, false);
          return m.reply("edit", nul, "*_Nsfw Disabled_*");
        } else if (!Group.isNsfw && (args === "off")) {
          return m.reply("edit", nul, "*_Nsfw is already Disabled_*");
        } else {
          return m.reply("edit", nul, `*_Use Command With On/Off_* \n*_Example:- ${prefix}nsfw on_*`);
        }
      }
    } catch (error) {
      m.text('edit', nul, '*_Error!!_*');
    }
  }
}
