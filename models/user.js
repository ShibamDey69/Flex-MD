import mongoose from 'mongoose';


const userSchema = new mongoose.Schema({
  _uid: {
    type: String,
    required: true,
    unique: true,
  },
  username: {
    type: String,
    default: "Anonymous"
  },
  phone: {
    type: Number,
    required: true,
    unique: true,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  isBanned: {
    type: Boolean,
    default: false,
  },
  isPro: {
    type: Boolean,
    default: false,
  },
  isChatBot: {
    type: Boolean,
    default: false
  },
  usage: {
    type: Number,
    default: 0
  },
  created: {
    type: String,
    default: Date.now,
  }
});


const User = new mongoose.model('User', userSchema);


export default User
    
  