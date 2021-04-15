
const express = require('express')
const router = express.Router()
const User = require('../models/User') 
const Todos = require('../models/Todos') 
require('dotenv').config()



router.post('/addTodo', async (req, res) => { 


  try {
      let user=await User.findOne({'authKey':req.body.authKey})
      if(user ){
        let newTodo=new Todos({
            title: req.body.title,
            description: req.body.description,
            category:req.body.category,
            addedBy:req.body.authKey
        })
        await newTodo.save()
        res.status(200).json({success:true})
      }
      else{
        res.status(200).json({success:false,reason:0})
      }
  } catch (err) {
    res.status(500).json({success:false,message:err.message})
  }
})
router.post('/removeTodo', async (req, res) => { 
    try {
        let user=await User.findOne({'authKey':req.body.authKey})
        if(user){
            await Todos.deleteOne({'_id':req.body.todoId})
            res.status(200).json({success:true})
        }
        else{
          res.status(200).json({success:false,reason:0})
        }
    } catch (err) {
      res.status(500).json({success:false,message:err.message})
    }
})
router.post('/getTodos', async (req, res) => { 
    try {
        let user=await User.findOne({'authKey':req.body.authKey})
        if(user){
            let allTodos=await Todos.find({'addedBy':req.body.authKey})
            res.status(200).json({success:true,todos:allTodos})
        }
        else{
          res.status(200).json({success:false,reason:0})
        }
    } catch (err) {
      res.status(500).json({success:false,message:err.message})
    }
  })



    
module.exports = router