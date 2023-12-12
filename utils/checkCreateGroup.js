import Group from '../models/groups.js'
import {GroupDbFunctions} from '../utils/dbFunctions.js'
let GcDb = new GroupDbFunctions(Group)
 const checkCreateGroup = async (groupId, groupName) => {
  try {
    let checkGroup = await GcDb.getGroup(groupId)
    if(checkGroup) {
      await GcDb.setGcUsage(groupId,1)
      return checkGroup
    } else {
      let newGroup = new Group({
        group_id: groupId,
        name: groupName
      })
      await newGroup.save()
      await GcDb.setGcUsage(groupId,1)
      return newGroup
    }
  } catch (error) {
    throw new Error(error)
  }
}

export default checkCreateGroup;
