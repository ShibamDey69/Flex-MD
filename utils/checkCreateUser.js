const checkCreateUser = async (sender, Neko) => {
  try {
    const [checkUser] = await Promise.all([
Neko.UserDb.getUser(sender[0].id.includes(":")?sender[0].id.split(":")[0]:sender[0].id.split("@")[0]),
    ]);

    if (!checkUser) {
      const [newUser] = await Promise.all([
        await Neko.UserDb.createUser(sender[0].id, sender[0].notify),
        Neko.UserDb.setUsage(sender[0].id, 1),
      ]);
      return newUser;
    }
  } catch (error) {
    throw new Error(error);
  }
};

export default checkCreateUser;
