const checkCreateGroup = async (groupId, groupName, Neko) => {
  try {
    const [newGroup] = await Promise.all([
      Neko.GroupDb.getGroup(groupId,groupName),
    ]);
    await Neko.GroupDb.setGcUsage(groupId, 1);
    return newGroup;
  } catch (error) {
    throw new Error(error);
  }
};

export default checkCreateGroup;
