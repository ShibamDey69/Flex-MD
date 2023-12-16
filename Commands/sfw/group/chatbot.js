export default {
  name: "chatbot",
  alias: ["cb"],
  desc: "Enable/Disable chatbot in group",
  category: "Group",
  usage: `${prefix}chatbot on`,
  run: async (Neko,m,
    { isAdmin,isGroup,from,args,isMeAdmin,groupId,nul }
  ) => {
  try {
    if (isGroup) {
      if (!isAdmin) return m.reply("edit", nul, "*_You are not admin group...!!_*");
      if (!isMeAdmin) return m.reply("edit", nul, "*_I am not admin group...!!_*");
      if (!args) return m.reply("edit", nul, `*_Please select on/off...!! \nExample:- ${prefix}chatbot on_*`);
   let Group = await Neko.GroupDb.getGroup(groupId)
      if(Group) {
      if(args === "on") {
        if (Neko.GroupDb.isChatBot) return m.reply("edit", nul, "*_Chatbot is already enabled in this group...!!_*");
        await Neko.GroupDb.setGcChatBot(groupId,true);
        return m.reply("edit", nul, "*_Chatbot has been enabled in this group...!!_*");
      
      } else if(args === "off") {
        if (!Neko.GroupDb.isChatBot) return m.reply("edit", nul, "*_Chatbot is already disabled in this group...!!_*");
        await Neko.GroupDb.setGcChatBot(from,false);
        return m.reply("edit", nul, "*_Chatbot has been disabled in this group...!!_*");
      }
    }
  }
    if(!isGroup) {
      let User = await Neko.UserDb.getUser(from)
    if(User) {
      if(args === "on") {
     if (Neko.UserDb.isChatBot) return m.reply("edit", nul, "*_Chatbot is already enabled in this group...!!_*");
        await Neko.UserDb.setChatBot(from,true);
        return m.reply("edit", nul, "*_Chatbot has been enabled in this group...!!_*");
      
      } else if(args === "off") {
        if (!Neko.UserDb.isChatBot) return m.reply("edit", nul, "*_Chatbot is already disabled in this group...!!_*");
        await Neko.UserDb.setChatBot(from,false);
        return m.reply("edit", nul, "*_Chatbot has been disabled in this group...!!_*");
      }
    }
  }
      } catch(error) {
m.text('edit',nul,'*_Error!!_*');
      }
  }
}

    