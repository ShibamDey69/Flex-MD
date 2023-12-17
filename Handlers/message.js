import { getContentType } from '@whiskeysockets/baileys';
import fs from "node:fs";
import fetch from 'node-fetch';
import cooldown from '../utils/cooldown.js';

import checkCreateGroup from '../utils/checkCreateGroup.js';
import statusCollector from "./status.js";
import AntilinkFunc from '../utils/antilink.js';


let MessageHandle = async (m, Neko,CommandList) => {
  try {
    
    const messageType = getContentType(m.messages[0].message);

    let isMe = m.messages[0].key.fromMe
    
    const mentionTag = m.messages[0].message?.extendedTextMessage?.contextInfo?.participant
    const isGroup = m.messages[0].key.remoteJid.includes('@g.us');

    const name = m.messages[0]['pushName'];

    const sender = isMe?Neko.user.id.replace(":2",""):(isGroup ? m.messages[0].key.participant : m.messages[0].key.remoteJid);

    const from = m.messages[0].key.remoteJid;

    const gcMeta = isGroup ? await Neko.groupMetadata(from) : '';

    const gcName = isGroup ? gcMeta.subject : '';

    const body = m.messages[0].message?.conversation ||
      m.messages[0].message?.[messageType]?.text ||
      m.messages[0].message?.[messageType]?.caption || '';

    const quoted = m.messages[0].message?.extendedTextMessage?.contextInfo?.participant || null;
    
    const isQuoted = quoted ? true : false;
    
    let text = (body == '') ? messageType : body;

    let cmdName = text?.toString().slice(prefix.length).trim().split(" ").shift().toLowerCase();

    let args = text?.slice(2 + cmdName.length).trim()

    let isCmd = body?.startsWith(prefix);

    let isOwner = sender.includes(owner)

    let groupMeta = isGroup ? await Neko.groupMetadata(from) : '';
 
    let participants = isGroup? groupMeta.participants.map((v) => v.id):[];
    
    let groupId = isGroup ? groupMeta.id : '';

    let Admins = isGroup? groupMeta.participants.filter((v) => v.admin === 'admin').map(v => v.id):[];
    
    let isAdmin = isGroup? Admins.includes(sender):false;
    
    let isMeAdmin =  Admins?.includes(`${global.owner}@s.whatsapp.net`);
    
    let groupName = isGroup ? groupMeta.subject : 'Private Chat'

    const groupLinkRegex = /(?:t\.me\/joinchat\/[a-zA-Z0-9_-]+)|(?:chat\.whatsapp\.com\/[a-zA-Z0-9_-]+)/;

    let viewonce = m.messages[0].message?.viewOnceMessageV2;
    
    let timeoutDelay = 5000;
    
    let fetchF = async (url, method = "json") => {
      try {
        let res = await fetch(url);
        let response = await res[method]();
        return response;
      } catch (error) {
        throw new Error(error);
      }
    }

    async function react(emoji) {
      try {
        const reactionMessage = {
          react: {
            text: emoji,
            key: m.messages[0].key
          }
        }
        await Neko.sendMessage(from, reactionMessage)
      } catch (error) {
        throw new Error(error)
      }
    }

    m.messages[0].reply = async (method, url = "", text = "") => {
      try {
        switch (method) {
          case 'text':
          return await Neko.sendMessage(from, { text:text },
              { quoted: m.messages[0] });
            break;
          case 'mention':
            await Neko.sendMessage(from, { text:text,mentions:[url] },
              { quoted: m.messages[0] });
            break;
            case 'image':
            await Neko.sendMessage(from, { image: {url:text}, caption: '© X-Neko' },
              { quoted: m.messages[0] })
            break;
          case 'video':
            await Neko.sendMessage(from, { video: { url: url }, caption: '© X-Neko' },
              { quoted: m.messages[0] })
            break;
          case 'audio':
            await Neko.sendMessage(from, { audio: { url: url }, mimetype: 'audio/mp4', ptt: false },
              { quoted: m.messages[0] })
            break;
          case 'sticker':
            await Neko.sendMessage(from, { sticker: { url: url }, mimetype: 'image/webp' },
              { quoted: m.messages[0] })
            break;
          case 'document':
            await Neko.sendMessage(from, { document: { url: url }, mimetype: 'application/pdf' },
              { quoted: m.messages[0] })
            break;
          case 'edit':
            await Neko.relayMessage(from, {
      protocolMessage: {
         key: url.key ,
         type: 14,
        editedMessage: { conversation: text }
              }
            }, {})
            break;
          default:
            break;
        }
      } catch (error) {
        throw new Error(error)
      }
    }

    if ((from.split("@")[0]) === "status") return statusCollector(Neko, m.messages[0], { messageType, name });

    if (isGroup) {
      
      let checkGroup = await checkCreateGroup(groupId, groupName,Neko);
      if (!checkGroup) return;

      if(isCmd) {
      if (checkGroup.isSilent &&  !cmdName.includes("silent") ) return  
  }
      if(checkGroup.isBanned && !isOwner &&!isMe && isCmd)
        return m.messages[0].reply("text",null,"*_This Group has been banned from using this bot._*");
      
     if(!isAdmin && groupLinkRegex.test(text) && checkGroup.isAntilink &&!isMe&& !isOwner) return await AntilinkFunc(
          Neko, m.messages[0],sender,
  from,text,isMeAdmin
            );
    }

    if (!isCmd) return;
  
    let user = await Neko.UserDb.getUser(sender.includes(":")?sender.split(":")[0]:sender.split("@")[0])

    if (!user) return m.messages[0].reply("text", null, `*_User not found...!_*\n
    To use this bot you have to register first...!\n
    *_Caution_*: Don't forget to add your country code when You are putting the Number...!!!!\n
  *_Register at:-_*\n
 *WebSite:-* https://weeb-api-neko.onrender.com`
    )
    
    if (user?.isBanned) return m.messages[0].reply("text", null, `*_You are banned to use this bot_*...!`)
    
    global.api_key = user.apiKey;

    if (text?.endsWith(prefix)) return m.messages[0].reply("text", null, "*_No Such Command Exists!!_*");

 async function CommandRun() {
      try {
        if (CommandList.has(cmdName)) {
    let Command = CommandList.get(cmdName)
                await react(Command?.react || "💖")
     let nul = await m.messages[0].reply("text", null, `*_Processing_*`)
                return await Command.run(Neko, m.messages[0], {nul,
mentionTag, name, sender, gcMeta, gcName, args, from,cmdName, body, quoted, text, viewonce, isGroup, isQuoted, isMe, messageType, fetchF,Admins,isMeAdmin,isAdmin,isOwner,groupId,participants
                })
        } else {
        await react("🚫")
        return m.messages[0].reply("text", null, "*_No Such Command Exists!!_*");
        }
      } catch (error) {
        console.log(error);
      }
    }
   await cooldown(sender,  timeoutDelay, m.messages[0], CommandRun)
  } catch (error) {
    console.log(error)
  }
}
export default MessageHandle;