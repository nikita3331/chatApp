const mongoose = require('mongoose')

const messageSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true
  },
  createdAt:{
    type:Date,
    required:true
  },
  sender: {
    type: String,
    required: true
  },
  receiver: {
    type: String,
    required: true
  }
  
})

module.exports = mongoose.model('Messages', messageSchema,'Messages')

