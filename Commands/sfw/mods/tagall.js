export default {
  name: "tagall",
  alias: ["tall", "ta","ping"],
  description: "Tag all members in the group",
  aliases: ["tagall"],
  category: "group",
  usage: "tagall",
  cooldown: 5,
  run: async (Neko, m, { nul, args, from, participants, isAdmin, isGroup }) => {
    try {
      if (!isGroup)
        return await m.reply(
          "edit",
          nul,
          "*_This command is only for groups_*...!",
        );

      if (!isAdmin)
        return await m.reply(
          "edit",
          nul,
          "*_You are not allowed to use this command_*...!",
        );

      let text = `*_Tag All Members in this Group_*...!\n\n Message: ${
        args.includes("--hide") ? args.replace("--hide", "") : args || "No Message Provided"
      }\n\n`;
      if (args.includes("--hide"))
        return await Neko.sendMessage(
          from,
          {
            text: text || "No Message Provided...!",
            mentions: participants,
          },
          { quoted: m },
        );
      participants.forEach((v) => {
        text += `@${v.replace(/@s\.whatsapp\.net/g, "")}\n`;
      });

      await Neko.sendMessage(
        from,
        { text: text || "No Message Provided", mentions: participants },
        { quoted: m },
      );
    } catch (err) {
      m.reply("edit", nul, "*_Error!!_*");
    }
  },
};
