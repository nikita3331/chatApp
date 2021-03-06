const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  login: {
    type: String,
    required: true
  },
  password:{
    type:String,
    required:true
  },
  authKey:{
    type:String,
    required:true
  },
  avatarUri:{
    type:String,
    required:true
  }
})

module.exports = mongoose.model('Users', userSchema,'Users')

