import { QuickDB } from "quick.db";
const db = new QuickDB();

export default class Verify {
   
   constructor(Neko) {
      this.Neko = Neko;
      this.db = db;
      this.db.init()
   }

  async proLoad() {
    try {
      const proArr = await this.Neko.UserDb.filterUser({
        isPro: true
      });
      const proUsers = proArr.map((user) => user.phone);
      return proUsers;
    } catch (error) {
      console.error(error);
      throw Error("Error loading Pro Users");
    }
  }
  async banLoad() {
    try {
      const banArr = await this.Neko.UserDb.filterUser({
        isBanned: true
      });
      const banUsers = banArr.map((user) => user.phone);
      return banUsers;
    } catch (error) {
      console.error(error);
      throw Error("Error loading Banned Users");
    }
  }
  
  async adminLoad() {
    try {
      const adminArr = await this.Neko.UserDb.filterUser({
        isAdmin: true
      });
      const adminUsers = adminArr.map((user) => user.phone);
      return adminUsers;
    } catch (error) {
      console.error(error);
      throw Error("Error loading Admin Users");
    }
  }
}

