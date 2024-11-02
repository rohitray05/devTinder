const express = require('express');
const requestRouter = express.Router();
const { userAuth } = require('../middleware/auth');
const ConnectionRequest = require('../models/connectionRequest');
const User = require('../models/user');

requestRouter.post('/request/send/:status/:toUserId',userAuth,async (req,res)=>{
  try {
    const fromUserId = req.user._id;
    const toUserId = req.params.toUserId;
    const status = req.params.status;
    //console.log(fromUserId,toUserId,status)

    const allowedStatus = ['ignored','interested']
    console.log(allowedStatus.includes(status))
    if(!allowedStatus.includes(status)){
     return res.status(400).json({
        message:'Invalid status type: ' + status
      })
    }

    //if there is existing Connection Request
    //If Dulicate connection from A->B exists or B->A exists 
    const existingConnectionReq = await ConnectionRequest.findOne({
      $or:[
        {fromUserId,toUserId},
        {fromUserId:toUserId,toUserId:fromUserId}
      ]
    })

    if(existingConnectionReq){
     return res.status(400).json({
        error:'Duplicate Request '
      })
    }

    //ToUser exists of not
    const existingToUser = await User.findById(toUserId)
    if(!existingToUser){
     return res.status(400).json({
      error:'Requested User Does not Exists'
     })
    }

    const connRequest = new ConnectionRequest({
      fromUserId,
      toUserId,
      status
    })
    
    //console.log(connRequest)
    

    const successMessage={
      interested:'is interested in',
      ignored:'has ignored'
    }
    const data = await  connRequest.save()
    res.json({
      message: req.user.firstName + ' ' + successMessage[status] + ' ' + existingToUser.firstName,
      data
    });
  } catch (error) {
    res.status(400).send('Error ' + error.message)
  }
})



requestRouter.post('/request/review/:status/:requestId',userAuth,async (req,res)=>{
  try {
    //Yuvi->interested->yoyo key
    //Yuvi->ignored dhoni
    //loggedInUser is To User either yoyo or ms
    //status can be accepted/rejected
    //requestId is giving ID or either yoyo
    //Since yuvi ignored Dhoni, dhoni cannot see yuvi profile
    const loggedInUser = req.user
    const {status,requestId} = req.params
    const allowedStatus = ['accepted','rejected']
    if(!allowedStatus.includes(status)){
      return res.status(400).json({
        message:'Status not allowed!!!'
      })
    }
    
    //Trying to Find conn request from Yuvi->yoyo
    //So toUser will be loggedin User
    const connectionRequest = await ConnectionRequest.findOne({
      fromUserId:requestId,
      toUserId:loggedInUser._id,
      status:'interested'
    })

    if(!connectionRequest){
      return res.status(400).json(
        {
          message:'Connection Request Not Found'
        }
      )
    }

    connectionRequest.status = status
    const data = await connectionRequest.save();
    res.json({
      messsage:'Connection Requested ' + status,
      data
    })
  } catch (error) {
    res.status(400).send('ERROR: '+ error.message)
  }
})


module.exports = {
  ConnectionRequestRouter:requestRouter
}
