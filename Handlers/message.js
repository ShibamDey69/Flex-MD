import { getContentType } from '@whiskeysockets/baileys';
import fetch from 'node-fetch';
import cooldown from '../utils/cooldown.js';
import statusCollector from "./status.js";
import AntilinkFunc from '../utils/antilink.js';
import checkCreateGroup from '../utils/checkCreateGroup.js';
import '../config.js';

let MessageHandle = async (m, Neko,CommandList) => {
  try {

    const messageType = getContentType(m.messages[0].message);

    const isMe = m.messages[0].key.fromMe;

    const isGroup = m.messages[0].key.remoteJid.includes('@g.us');

    const sender = isMe?Neko.user.id.replace(":2",""):(isGroup ? m.messages[0].key.participant : m.messages[0].key.remoteJid);
    
    const senderNumber = sender?.includes(":")?sender.split(":")[0]:sender.split("@")[0];
    
    const mentionTag = m.messages[0].message?.extendedTextMessage?.contextInfo?.participant
    
    const name = m.messages[0]['pushName'];

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

    let isOwner = owner.includes(senderNumber);

    let groupMeta = isGroup ? await Neko.groupMetadata(from) : '';
 
    let participants = isGroup? groupMeta.participants.map((v) => v.id):[];
    
    let groupId = isGroup ? groupMeta.id : '';

    let Admins = isGroup? groupMeta.participants.filter((v) => v.admin === 'admin' || v.admin === 'superadmin').map(v => v.id):[];

    
    let isMeAdmin =  Admins?.includes(`${global.owner}@s.whatsapp.net`);
    let isAdmin =  isMe?isMeAdmin:Admins?.includes(sender);
    
    let groupName = isGroup ? groupMeta.subject : 'Private Chat'

    const groupLinkRegex = /(?:t\.me\/joinchat\/[a-zA-Z0-9_-]+)|(?:chat\.whatsapp\.com\/[a-zA-Z0-9_-]+)/;

    let viewonce = m.messages[0].message?.viewOnceMessageV2;
    
    let timeoutDelay = 5000;

    let quotedMessage = {
      message: m.messages[0].message?.extendedTextMessage?.contextInfo?.quotedMessage
    }

    let quotedMessType = getContentType(quotedMessage.message)
      
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
            await Neko.sendMessage(from, { image: {url}, caption: '© X-Neko' },
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
            
            await Neko.sendMessage(from, {
      text,
      edit: url.key,
    });
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
     if(!isAdmin && groupLinkRegex.test(text) && Neko.antilinkGc(from) &&!isMe&& !isOwner) return await AntilinkFunc(
          Neko, m.messages[0],sender,
  from,text,isMeAdmin
        );
    }

    if (!isCmd) return;
    
    if (isGroup) await checkCreateGroup( groupId, groupName, Neko );
    
    
    
    if (text?.endsWith(prefix)) return m.messages[0].reply("text", null, "*_I am Alive, Baka!!_*"),await react("😁");

 async function CommandRun() {
      try {
        if (CommandList.has(cmdName)) {
    let Command = CommandList.get(cmdName);
     await react(Command?.react || "💖");
     let nul = await m.messages[0].reply("text", null, `*_Processing_*`);
          
          if(!Neko.modUsers?.includes(senderNumber) && Command.category === "mods") return await m.messages[0].reply("edit", nul, `*_You are not allowed to use this command_*...!`);
          
                return await Command.run(Neko, m.messages[0], {
nul,mentionTag, name, sender, gcMeta, gcName, args, 
from,cmdName, body, quoted, text, viewonce, isGroup,
isQuoted, isMe, messageType, fetchF,Admins,isMeAdmin,quotedMessage,quotedMessType,timeoutDelay,isAdmin,isOwner,groupId,participants
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