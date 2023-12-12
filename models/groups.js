import mongoose from 'mongoose';

const GroupSchema = new mongoose.Schema({
  group_id: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  usage: {
    type: Number,
    default: 0
  },
  isBanned: {
   type: Boolean,
   default:false
  },
  isAntilink: {
   type: Boolean,
   default:false
  },
  isWelcome: {
    type: Boolean,
    default:false
  },
  isPremium: {
   type: Boolean,
   default: false
  },
  isSilent: {
    type: Boolean,
    default:false
  },
  reason: {
    type: String,
    default: 'No Reason Provided'
  },
  isNsfw: {
    type: Boolean,
    default:false
  },
  isChatBot : {
    type: Boolean,
    default:false
  },
  isAntibadword: {
   type: Boolean,
   default: false
  }
});

const Group = mongoose.model('Group', GroupSchema);

export default Group;