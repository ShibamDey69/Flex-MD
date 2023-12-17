const checkCreateGroup = async (groupId, groupName, Neko) => {
  try {
    const [checkGroup] = await Promise.all([
      Neko.GroupDb.getGroup(groupId),
    ]);

    if (checkGroup) {
      await Promise.all([
        Neko.GroupDb.setGcUsage(groupId, 1),
      ]);
      return checkGroup;
    } else {
      const [newGroup] = await Promise.all([
        await Neko.GroupDb.createGroup(groupId, groupName),
        Neko.GroupDb.setGcUsage(groupId, 1),
      ]);
      return newGroup;
    }
  } catch (error) {
    throw new Error(error);
  }
};

export default checkCreateGroup;
