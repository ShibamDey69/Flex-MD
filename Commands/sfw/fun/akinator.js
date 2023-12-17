import { Aki } from 'aki-api';

const region = 'en';
const childMode = false;
const proxy = undefined;
const sessions = new Map();

class Akinator {
  constructor(m, id) {
    this.id = id;
    this.m = m;
  }

  async handleErrors(nul, errorMessage) {
    return this.m.reply("edit", nul, errorMessage);
  }

  async start(nul) {
    try {
      const session = new Aki({ region, childMode, proxy });
      sessions.set(this.id, session);

      await Promise.all([
     await session.start(),
        this.m.reply("edit", nul, `*_Akinator has started!_*`),
        this.m.reply("text", null, `*Question:* *_${session.question}_*\n\n  "Yes":0,
  "No":1,
  "Don't know":2,
  "Probably":3,
  "Probably not":4\n\n*_Answer with the number of the answer you want to choose._*\n
  Usage: ${prefix}aki <answer>`),
      ]);

      return;
    } catch (error) {
      return this.handleErrors(nul, '*_An error occurred while starting Akinator._*');
    }
  }

  async step(answer, nul) {
    try {
      const session = sessions.get(this.id);
      if (!session) {
        return this.handleErrors(nul, '*_Akinator has not been started._*\n\n*_Use ${prefix}aki start to start a new game._*');
      }

      await Promise.all([
  await session.step(answer),
        (async () => {
          if (session.progress >= 80 || session.currentStep >= 78) {
            const win = await session.win();
            await this.m.reply("edit", nul, `*_I think this is your character Name:_* ${win.guesses[0].name}\n
*_Description_* :*_${win.guesses[0]?.description}_*`);
          } else {
            await this.m.reply("edit", nul, `*Question:* *_${session.question}_*\n*_Progress:_*\n${session.progress}`);
          }
        })(),
      ]);

      return;
    } catch (error) {
      return this.handleErrors(nul, `*_${error}_*\nplease restart the game using command: ${prefix}aki start_*`);
    }
  }

  async back(nul) {
    try {
      const session = sessions.get(this.id);
      if (!session) {
        return this.handleErrors(nul, '*_Akinator has not been started._*\n\n*_Use ${prefix}aki start to start a new game._*');
      }

      await Promise.all([
    await session.back(),
        this.m.reply("edit", nul, `*Question:* *_${session.question}_*\n*_Progress:_*\n${session.progress}`),
      ]);

      return;
    } catch (error) {
      return this.handleErrors(nul, '*_An error occurred while backing Akinator._*');
    }
  }
}

export default {
  name: "akinator",
  alias:["aki"],
  description: "Play a game of akinator",
  category: "gaming",
  run: async (Neko,m,{sender,args,nul}) => {
  try {  
  if (args.length < 1) return await m.reply('edit',nul,`*_Please provide a argument!\nExample:-${prefix}args start_*`);
  let aki = new Akinator(m,sender);
  if( args.startsWith("start"))  return await aki.start(nul);
 else if(/[0-4]/.test(args)) return await aki.step(args,nul);
else if(/[5-9]/.test(args)) return await m.reply('edit',nul,"Invalid option");
  else if(args.startsWith("back")) return await aki.back(nul);
  } catch (error) {
await m.reply('edit',nul,"*_Error!!_*");
    throw Error(error);
      }
   }
}
