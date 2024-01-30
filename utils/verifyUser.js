export default class Verify {
  
   constructor(Neko) {
      this.Neko = Neko;
   }

  async proLoad() {
    try {
      const proArr = await this.Neko.UserDb.filterUser(
        "isPro", true
      );
      const proUsers = proArr.map((user) => user.id);
      return proUsers;
    } catch (error) {
      console.error(error);
      throw Error("Error loading Pro Users");
    }
  }
  async banLoad() {
    try {
      const banArr = await this.Neko.UserDb.filterUser(
        "isBanned", true
      );
      const banUsers = banArr.map((user) => user.id);
      return banUsers;
    } catch (error) {
      console.error(error);
      throw Error("Error loading Banned Users");
    }
  }
  
  async modLoad() {
    try {
      const adminArr = await this.Neko.UserDb.filterUser(
        "isMod", true
      );
      const adminUsers = adminArr.map((user) => user.id);
      return adminUsers;
    } catch (error) {
      console.error(error);
      throw Error("Error loading Admin Users");
    }
  }

  async silentLoad() {
    try {
      const silentArr = await this.Neko.UserDb.filterUser(
        "isSilent", true
      );
      const silentUsers = silentArr.map((user) => user.id);
      return silentUsers;
    } catch (error) {
      console.error(error);
      throw Error("Error loading Silent Users");
    }
  }

  async proGcLoad() {
    try {
      const proArr = await this.Neko.GroupDb.filterGroup(
        "isPro", true
      );
      
      const proUsers = proArr.map((user) => user.value.us.group_id);
      return proUsers;
    } catch (error) {
      console.error(error);
      throw Error("Error loading Pro Users");
    }
  }

  async banGcLoad() {
    try {
      const banArr = await this.Neko.GroupDb.filterGroup(
        "isBanned", true
      );
      const banUsers = banArr.map((user) => user.value.us.group_id);
      return banUsers;
    } catch (error) {
      console.error(error);
      throw Error("Error loading Banned Users");
    }
  }

  async silentGcLoad() {
    try {
      const silentArr = await this.Neko.GroupDb.filterGroup(
        "isSilent", true
      );
      const silentUsers = silentArr.map((user) => user.value.us.group_id);
      return silentUsers;
    } catch (error) {
      console.error(error);
      throw Error("Error loading Silent Users");
    }
  }

  async antilinkGcLoad() {
    try {
      const antilinkArr = await this.Neko.GroupDb.filterGroup( 
        "isAntilink", true
        );
      const antilinkGc = antilinkArr.map((user) => user.value.us.group_id);
      return antilinkGc;
    } catch (error) {
      console.error(error);
      throw Error("Error loading Antilink Users");
    }
  }
}

