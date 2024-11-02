const express = require('express')
const { userAuth } = require('../middleware/auth');
const ConnectionRequest = require('../models/connectionRequest');

const userRouter = express.Router()

//Get All Pending connection Requests received by the loggedIn User
userRouter.get('/user/connections/received',userAuth,async (req,res)=>{
  try {
    const loggedInUser  = req.user
    
    const connectionRequests = await ConnectionRequest.find({
      toUserId:loggedInUser._id,
      status:'interested'
    }).populate('fromUserId',['firstName','lastName']) //fromUserId liked User si something we need and list fields required from user
    
    res.json({
    message:'Connection Requests',
    data:connectionRequests
  }) 
  } catch (error) {
    res.status(400).send('ERROR ' + error.message )
  }
})

module.exports = {
  userRouter
}