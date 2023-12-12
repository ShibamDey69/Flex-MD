import mongoose from 'mongoose';


const userSchema = new mongoose.Schema({
  _uid: {
    type: String,
    required: true,
    unique: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
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
  isPremium: {
    type: Boolean,
    default: false,
  },
  apiKey: {
    type: String,
    required: true,
    unique: true,
  },
  usage: {
    type: Array,
    default: [],
  },
  created: {
    type: String,
    default: Date.now,
  },
  verified: {
    type: Boolean,
    default: false
  },
  isChatBot: {
    type: Boolean,
    default: false
  },
  token: {
    type: String,
    required: true,
  }
});


const User = new mongoose.model('User', userSchema);


export default User
    
  