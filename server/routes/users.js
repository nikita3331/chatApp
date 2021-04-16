
const express = require('express')
const router = express.Router()
const User = require('../models/User') 
const crypto = require("crypto");

require('dotenv').config()



router.post('/register', async (req, res) => { 


  try {
      let user=await User.findOne({'login':req.body.login})
      if(!user ){
        let auth=crypto.randomBytes(20).toString('hex')
        let newUser=new User({
          login: req.body.login,
          password: req.body.password,
          authKey:auth
        })
        await newUser.save()
        res.status(200).json({success:true})
      }
      else{
        res.status(201).json({success:false,reason:0})
      }
  } catch (err) {
    res.status(500).json({success:false,message:err.message,reason:1})
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