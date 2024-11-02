const express = require('express')
const { userAuth } = require('../middleware/auth');
const ConnectionRequest = require('../models/connectionRequest');
const User = require('../models/user');

const userRouter = express.Router()
const USER_SAFE_DATA = "firstName lastName photoUrl age gender about skill"
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

//Get All Accepted connections Requests received by the loggedIn User
userRouter.get('/user/connections',userAuth, async (req,res)=>{
  try {
    const loggedInUser = req.user
    const connectionRequests = await ConnectionRequest.find({
      $or:[
        {toUserId:loggedInUser._id,status:'accepted'},
        {fromUserId:loggedInUser._id,status:'accepted'}
      ]
    })
    .populate('fromUserId',USER_SAFE_DATA)
    .populate('toUserId',USER_SAFE_DATA)

    //If I want information Only abt connection we can use map and send only fromUserId 
    //fromUserID IS ALREADY REFERENCED TO USER NAME AND STUFF SO i WILL GET only USER_SAFE_DATA
    const data = connectionRequests.map(row=>{
      if(row.fromUserId._id.toString() === loggedInUser.toString())
      return row.fromUserId
    })

  
   res.json({
    message:'Connection Requests',
    data
   }) 
  } catch (error) {
     res.status(400).send('ERROR '+ error.message)
  }
})



//Feeds API
//User should not see already shown interested|ignored User
//User should not see already connected User
//User should not see his own card   
userRouter.get('/user/feed',userAuth, async (req,res)=>{
  try {
     const loggedIn = req.user
     
     const page = parseInt(req.query.page) || 1
     let limit = parseInt(req.query.limit) || 10
     limit = limit>50?50:limit 
     

     const skip = (page-1)*limit;
    //1. Find all connections which received/requested
    const connectionRequests = await ConnectionRequest.find({
      $or:[
        {fromUserId:loggedIn._id},
        {toUserId:loggedIn._id}
      ]
    }).select("fromUserId toUserId")


    const hideUserFromFeed = new Set()
    //Both From and To User IDs has to be pushed into set to have non duplicate
    connectionRequests.forEach(reqsts=>{
      hideUserFromFeed.add(reqsts.fromUserId.toString())
      hideUserFromFeed.add(reqsts.toUserId.toString())
    })
    

    const users = await User.find({
      $and:[
        {_id:{$nin:Array.from(hideUserFromFeed)}},
        {_id:{$ne:loggedIn._id}}
      ]
    }).select(USER_SAFE_DATA)
    .skip(skip).limit(limit)

    res.json({
      message:'Feeds',
      data:users
    })

  } catch (error) {
     res.status(400).send('ERROR ' + error.message)
  }
})

module.exports = {
  userRouter
}