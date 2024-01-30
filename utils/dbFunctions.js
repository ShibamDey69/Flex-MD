import { v4 as uuidv4 } from "uuid";
import { QuickDB } from "quick.db";
import path, { join } from "path";
const __dirname = path.resolve();
class UserDbFunctions {
  constructor() {
    this.path = (name) => join(__dirname, ".", "storage", `${name}.sqlite`);
    this.User = new QuickDB({ filePath: this.path("user") });
  }

  async getUser(sender, name) {
    try {
      this.Number = 
        sender.includes(":")
          ? sender.split(":")[0]
          : sender.replace(/[^0-9]/g, "");    

      let newUser =
        (await this.User.get(this.Number)) ||
        (await this.User.set(this.Number, {
          _uid: uuidv4(),
          username: name || "anonymous",
          phone: this.Number,
          isPro:false,
          isBanned: false,
          isMod: false,
          isChatBot: false,
          isSilent: false,
          exp: 0,
          os: "android",
          rank: "rookie",
        }));
      return newUser;
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }

  async filterUser(key, value) {
    try {
      let users = await this.User.all();
      let filter = users.filter((user) => user.value[key] === value);
      return filter;
    } catch (error) {
      throw new Error(error);
    }
  }

  async setChatBot(sender, state = true) {
    try {
      this.Number = 
        sender.includes(":")
          ? sender.split(":")[0]
          : sender.replace(/[^0-9]/g, "");

      let chatBot = await this.User.get(this.Number);

      if (!chatBot) {
        throw new Error("User not found");
      }
      chatBot.isChatBot = state;
      await this.User.set(this.Number, chatBot);
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }

  async setPremium(sender, state = true) {
    try {
      this.Number = 
        sender.includes(":")
          ? sender.split(":")[0]
          : sender.replace(/[^0-9]/g, "");

      let premium = await this.User.get(this.Number);

      if (!premium) {
        throw new Error("User not found");
      }
      premium.isPro = state;
      await this.User.set(this.Number, premium);
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }

  async setBanned(sender, state = true) {
    try {
      this.Number = 
        sender.includes(":")
          ? sender.split(":")[0]
          : sender.replace(/[^0-9]/g, "");

      let banned = await this.User.get(this.Number);
      if (!banned) {
        throw new Error("User not found");
      }
      banned.isBanned = state;
      await this.User.set(this.Number, banned);
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }

  async setMod(sender, state = true) {
    try {
      this.Number = 
        sender.includes(":")
          ? sender.split(":")[0]
          : sender.replace(/[^0-9]/g, "");

      let mod = await this.User.get(this.Number);

      if (!mod) {
        throw new Error("User not found");
      }
      mod.isAdmin = state;
      await this.User.set(this.Number, mod);
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }

  async setSilent(sender, state = true) {
    try {
      this.Number = 
        sender.includes(":")
          ? sender.split(":")[0]
          : sender.replace(/[^0-9]/g, "");

      let silent = await this.User.get(this.Number);

      if (!silent) {
        throw new Error("User not found");
      }
      silent.isAdmin = state;
      await this.User.set(this.Number, silent);
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }

  async setUsage(sender, usage = 1) {
    try {
      this.Number = 
        sender.includes(":")
          ? sender.split(":")[0]
          : sender.replace(/[^0-9]/g, "");
      let usages = await this.User.get(this.Number);
      if (!usages) {
        throw new Error("User not found");
      }
      usages.usage = usages.usage + usage;
      await this.User.set(this.Number, usages);
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }

  async setExp(sender, exp = 1) {
    try {
      this.Number = 
        sender.includes(":")
          ? sender.split(":")[0]
          : sender.replace(/[^0-9]/g, "");
      let expss = await this.User.get(this.Number);
      if (!expss) {
        throw new Error("User not found");
      }
      expss.exp = expss.exp + exp;
      await this.User.set(this.Number, expss);
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }

  async setRank(sender, rank = "rookie") {
    try {
      this.Number = 
        sender.includes(":")
          ? sender.split(":")[0]
          : sender.replace(/[^0-9]/g, "");
      let ranks = await this.User.get(this.Number);
      if (!ranks) {
        throw new Error("User not found");
      }
      ranks.rank = rank;
      await this.User.set(this.Number, ranks);
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }

  async setOs(sender, os = "android") {
    try {
      this.Number = 
        sender.includes(":")
          ? sender.split(":")[0]
          : sender.replace(/[^0-9]/g, "");
      let oses = await this.User.get(this.Number);
      if (!oses) {
        throw new Error("User not found");
      }
      oses.os = os;
      await this.User.set(this.Number, oses);
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }
}

class GroupDbFunctions {
  constructor() {
    this.path = (name) => join(__dirname, ".", "storage", `${name}.sqlite`);
    this.Group = new QuickDB({ filePath: this.path("group") });
  }
  async getGroup(groupId, groupName) {
    try {
      let newGroup = (await this.Group.get(groupId)) || (await this.Group.set(groupId,{
        group_id: groupId,
        name: groupName,
        isBanned: false,
        isChatBot: false,
        isSilent: true,
        isAntilink:false,
        isAntiword:false,
        isWelcome:false,
        isNsfw:false,
        isPro:false,
        usage:0,
        created: Date.now()
      }));
      return newGroup;
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }

   async filterGroup(key, value) {
     try {
        let groups = await this.Group.all();
        let filter = groups.filter((group) => group.value.us[key] === value);
        return filter;
     } catch (error) {
        throw new Error(error);
     }
   }

   async setGcChatBot(groupId, state = true) {
     try {
        let chatBot = await this.Group.get(groupId);
        if (!chatBot) {
          throw new Error("Group not found");
        }
        chatBot.isChatBot = state;
        await this.Group.set(groupId, chatBot);
     } catch (error) {
        throw new Error(error);
     }
   }

   async setGcPremium(groupId, state = true) {
     try {
        let premium = await this.Group.get(groupId);
        if (!premium) {
          throw new Error("Group not found");
        }
        premium.isPro = state;
        await this.Group.set(groupId, premium);
     } catch (error) {
        throw new Error(error);
     }
   }

  async setGcBanned(groupId, state = true) {
    try {
      let banned = await this.Group.get(groupId);
      if (!banned) {
        throw new Error("Group not found");
      }
      banned.isBanned = state;
      await this.Group.set(groupId, banned);
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }

  
  async setGcSilent(groupId, state = true) {
    try {
      let silent = await this.Group.get(groupId);
      if (!silent) {
        throw new Error("Group not found");
      }
      silent.isSilent = state;
      await this.Group.set(groupId, silent);
    } catch (error) {
      throw new Error(error);
    }
  }

  async setGcAntilink(groupId, state = true) {
    try {
      let antilink = await this.Group.get(groupId);
      if (!antilink) {
        throw new Error("Group not found");
      }
      antilink.isAntilink = state;
      await this.Group.set(groupId, antilink);
    } catch (error) {
      throw new Error(error);
    }
  }
  
  async setGcAntiword(groupId, state = true) {
    try {
      let antiword = await this.Group.get(groupId);
      if (!antiword) {
        throw new Error("Group not found");
      }
      antiword.isAntiword = state;
      await this.Group.set(groupId, antiword);
    } catch (error) { 
      throw new Error(error);
    }
  }

  async setGcWelcome(groupId, state = true) {
    try {
      let welcome = await this.Group.get(groupId);
      if (!welcome) {
        throw new Error("Group not found");
      }
      welcome.isWelcome = state;
      await this.Group.set(groupId, welcome);
    } catch (error) {
      throw new Error(error);
    }
  }

  async setGcNsfw(groupId, state = true) {
    try {
      let nsfw = await this.Group.get(groupId);
      if (!nsfw) {
        throw new Error("Group not found");
      }
      nsfw.isNsfw = state;
      await this.Group.set(groupId, nsfw);
    } catch (error) {
      throw new Error(error);
    }
  }

  async setGcUsage(groupId, usage = 1) {
    try {
      let usages = await this.Group.get(groupId);
      if (!usages) {
        throw new Error("Group not found");
      }
      usages.usage = usages.usage + usage;
      await this.Group.set(groupId, usages);
    } catch (error) {
      throw new Error(error);
    }
  }

} 


export { UserDbFunctions, GroupDbFunctions };
