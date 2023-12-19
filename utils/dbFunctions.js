import { v4 as uuidv4 } from 'uuid';

class UserDbFunctions {
  constructor(User) {
    this.User = User;
  }

  async createUser(sender,name) {
    try {
      let newUser = await this.User({
        _uid:uuidv4(),
        username:name,
phone:Number(sender.includes(":")?sender.split(":")[0]:sender.split("@")[0])
         }).save()
      return newUser;
    } catch (error) {
      console.log(error)
    throw new Error(error)
  }
}

  
  async filterUser(data) {
    try {
       let filter = await this.User.find(data);
       return filter;
    } catch (error) {
       throw new Error(error)
    }
  }

  
  async getUser(number) {
    try {
      let user = await this.User.findOne({
        phone: Number(number)
      });
      return user;
    } catch (error) {
      console.log(error)
      throw new Error(error)
    }
  }

  async setChatBot(number, state = true) {
    try {
      let chatBot = await this.User.findOne({
        phone: Number(number)
      });

      if (chatBot) {
        chatBot.isChatBot = state;
        await chatBot.save();
      }
    } catch (error) {
      console.log(error)
      throw new Error(error)
    }
  }

  async setPremium(number, state = true) {
    try {
      let premium = await this.User.findOne({
        phone: Number(number)
      });

      if (premium) {
        premium.isPro = state;
        await premium.save();
      }
    } catch (error) {
      console.log(error)
      throw new Error(error)
    }
  }

  async setBanned(number, state = true) {
    try {
      let banned = await this.User.findOne({
        phone: Number(number)
      });
      if (banned) {
        banned.isBanned = state;
        await banned.save();
      }
    } catch (error) {
      console.log(error)
      throw new Error(error)
    }
  }

  async setAdmin(number, state = true) {
    try {
      let admin = await this.User.findOne({
        phone: Number(number)
      });

      if (admin) {
        admin.isAdmin = state;
        await admin.save();
      }
    } catch (error) {
      console.log(error)
      throw new Error(error)
    }
  }

  async setUsage(sender, usage = 1) {
    try {
      let usages = await this.User.findOne({
        phone:Number(sender.includes(":")?sender.split(":")[0]:sender.split("@")[0])
      })
      if (usages) {
        usages.usage = usages.usage + usage;
        await usages.save();
      }
    } catch (error) {
      console.log(error)
      throw new Error(error)
    }
  }
}


class GroupDbFunctions {
  constructor(Group) {
    this.Group = Group;
  }
  async createGroup(groupId, groupName) {
    try {
      let newGroup = await this.Group({
        group_id: groupId,
        name: groupName
    }).save()
      return newGroup;
    } catch (error) {
      console.log(error)
    throw new Error(error)
  }
}
        

  async filterGroup(data) {
    try {
       let filter = await this.Group.find(data);
       return filter;
      } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }
    
  
  
  async getGroup(id) {
    try {
      let group = await this.Group.findOne({
        group_id: id
      });
      return group;
    } catch (error) {
      console.log(error)
      throw new Error(error)
    }
  }

  async setGcBanned(id, state = true) {
    try {
      let banned = await this.Group.findOne({
        group_id: id
      });
      if (banned) {
        banned.isBanned = state;
        await banned.save();
      }

    } catch (error) {
      console.log(error)
      throw new Error(error)
    }
  }

  async setGcAntilink(id, state = true) {
    try {
      let antilink = await this.Group.findOne({
        group_id: id
      })
      if (antilink) {
        antilink.isAntilink = state;
        await antilink.save();
      }
    } catch (error) {
      console.log(error)
      throw new Error(error)
    }
  }

  async setGcAntibadword(id, state = true) {
    try {
      let antibadword = await this.Group.findOne({
        group_id: id
      })
      if (antibadword) {
        antibadword.isAntibadword = state;
        await antibadword.save();
      }

    } catch (error) {
      console.log(error)
      throw new Error(error)
    }
  }

  async setGcWelcome(id, state = true) {
    try {
      let welcome = await this.Group.findOne({
        group_id: id
      })
      if (welcome) {
        welcome.isWelcome = state;
        await welcome.save();
      }
    } catch (error) {
      console.log(error);
      throw new Error(error)
    }
  }

  async setGcNsfw(id, state = true) {
    try {
      let nsfw = await this.Group.findOne({
        group_id: id
      })
      if (nsfw) {
        nsfw.isNsfw = state;
        await nsfw.save();
      }
    } catch (error) {
      console.log(error);
      throw new Error(error)
    }
  }

  async setGcSilent(id, state = true) {
    try {
      let silent = await this.Group.findOne({
        group_id: id
      })
      if (silent) {
        silent.isSilent = state;
        await silent.save();
      }
    } catch (error) {
      console.log(error);
      throw new Error(error)
    }
  }
  async setGcChatBot(id, state = true) {
    try {
      let chatbot = await this.Group.findOne({
        group_id: id
      })
      if (chatbot) {
        chatbot.isChatBot = state;
        await chatbot.save();
      }
    } catch (error) {
      console.log(error);
      throw new Error(error)
    }
  }
  async setGcUsage(id, usage = 1) {
    try {
      let usages = await this.Group.findOne({
        group_id: id
      })
      if (usages) {
        usages.usage = usages.usage + usage;
        await usages.save();
      }
    } catch (error) {
      console.log(error)
      throw new Error(error)
    }
  }

  async setReason (id, reason) {
    try {
      let reasons = await this.Group.findOne({
        group_id:id
      })
      if(reasons) {
        reasons.reason = reason;
      await reasons.save()
      }
    } catch (err) {
      console.log(err)
      throw new Error(err)
    }
  }

} 

export { UserDbFunctions, GroupDbFunctions };
