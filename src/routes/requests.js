const express = require('express')
const User = require('../models/user');
const bcrypt = require('bcrypt');

const router = express.Router()

//Find one User by EmailId
router.post('/user',async (req,res)=>{
  const {emailID} = req.body
  if(emailID){
    try{
      const users = await User.find({emailID:emailID})
      if(users.length){
        res.send(users)
      }else{
        res.status(404).send('User Not Found!!')
      }
    }catch(err){
      res.send('Something went wrong!!!1')
    }
  }
})


//Get All User
router.get('/feed',async (req,res)=>{
   try{
    const users = await User.find({})
    if(!users.length){
     res.status(400).send('No User Found')
    }else{
      res.send(users)
    } 
   }catch(err){
      res.status(500).send('Something went wrong`')
   }
})

//Delete User
router.delete('/user',async (req,res)=>{
  const userId = req.body.userId
     try{
      const user = await User.findByIdAndDelete(userId)
      if(user){
        res.send('User Deleted Successfully')
      }else{
        res.status(400).send('User Not Found')
      }
     }catch(err){
      res.status(404).send('Something went wrong!!!')
     }
})

router.patch('/user:userId', async (req,res)=>{
  const userId = req.params?.userId
  const data = req.body
  
  if(!userId)
    res.send('Please pass User ID!!')

  try{
    // Do not allow certain fields to be updated
     const ALLOWED_FIELDS = ['userId','photoUrl','about','gender','age']
     const isUpdateAllowed = Object.keys(data).every(k=> ALLOWED_FIELDS.includes(k)) 
  
     if(!isUpdateAllowed){
          res.status(400).send('Update Not Allowed')
      }

    const update = await User.findByIdAndUpdate({_id:userId},data,{
      returnDocument:"after",
      runValidators:true
    })
    res.send(update)
  }catch(err){
    res.send("Update Failed: " + err.message)
  }
})



module.exports = {
  requestRouter:router
}