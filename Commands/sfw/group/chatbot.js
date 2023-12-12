export default {
  name: "chatbot",
  alias: ["cb"],
  desc: "Enable/Disable chatbot in group",
  category: "Group",
  usage: `${prefix}chatbot on`,
  run: async (Neko,m,
    { isAdmin,isGroup,UserDb,GroupDb,from,args,isMeAdmin,groupId,nul }
  ) => {
  try {
    if (isGroup) {
      if (!isAdmin) return m.reply("edit", nul, "*_You are not admin group...!!_*");
      if (!isMeAdmin) return m.reply("edit", nul, "*_I am not admin group...!!_*");
      if (!args) return m.reply("edit", nul, `*_Please select on/off...!! \nExample:- ${prefix}chatbot on_*`);
   let Group = await GroupDb.getGroup(groupId)
      if(Group) {
      if(args === "on") {
        if (GroupDb.isChatBot) return m.reply("edit", nul, "*_Chatbot is already enabled in this group...!!_*");
        await GroupDb.setGcChatBot(groupId,true);
        return m.reply("edit", nul, "*_Chatbot has been enabled in this group...!!_*");
      
      } else if(args === "off") {
        if (!GroupDb.isChatBot) return m.reply("edit", nul, "*_Chatbot is already disabled in this group...!!_*");
        await GroupDb.setGcChatBot(from,false);
        return m.reply("edit", nul, "*_Chatbot has been disabled in this group...!!_*");
      }
    }
  }
    if(!isGroup) {
      let User = await UserDb.getUser(from)
    if(User) {
      if(args === "on") {
     if (UserDb.isChatBot) return m.reply("edit", nul, "*_Chatbot is already enabled in this group...!!_*");
        await UserDb.setChatBot(from,true);
        return m.reply("edit", nul, "*_Chatbot has been enabled in this group...!!_*");
      
      } else if(args === "off") {
        if (!UserDb.isChatBot) return m.reply("edit", nul, "*_Chatbot is already disabled in this group...!!_*");
        await UserDb.setChatBot(from,false);
        return m.reply("edit", nul, "*_Chatbot has been disabled in this group...!!_*");
      }
    }
  }
      } catch(error) {
m.text('edit',nul,'*_Error!!_*');
      }
  }
}

    