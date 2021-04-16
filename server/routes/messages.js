
const express = require('express')
const router = express.Router()
const User = require('../models/User') 
const Message = require('../models/Message') 

const crypto = require("crypto");

require('dotenv').config()



router.get('/getAll', async (req, res) => { 


  try {
      let authKey=req.headers["authKey"]
      let user=await User.findOne({'authKey':authKey})
      if(user ){
        let allMessages=await Message.find({$or:[{sender:authKey},{receiver:authKey}]}) 
        res.status(200).json({success:true,messages:allMessages})
      }
      else{
        res.status(400).json({success:false,reason:0})
      }
  } catch (err) {
    res.status(500).json({success:false,message:err.message})
  }
})
router.post('/login', async (req, res) => { 
  try {
      let user=await User.findOne({'login':req.body.login,'password':req.body.password})
      if(user){
        res.status(200).json({success:true,authKey:user.authKey})
      }
      else{
        res.status(200).json({success:false,reason:0})
      }
  } catch (err) {
    res.status(500).json({success:false,message:err.message})
  }
})



    
module.exports = router