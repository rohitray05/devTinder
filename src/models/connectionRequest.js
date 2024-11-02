const mongoose = require('mongoose')

const connectionRequestSchema = new mongoose.Schema({
  fromUserId:{
    type:mongoose.Schema.Types.ObjectId,
    required:true,
    ref: 'User'
  },
  toUserId:{
    type:mongoose.Schema.Types.ObjectId,
    required:true,
    ref:'User'
  },
  status:{
    type:String,
    required:true,
    enum:{
      values:['ignored','interested','accepted','rejected'],
      message:`{VALUE} is invalid status type`
    }
  }
},{
  timestamps:true
})

//Compound Index
connectionRequestSchema.index({fromUserId:1,toUserId:1})

//Concept of Pre to be written only in Normal function and not in arrow
connectionRequestSchema.pre('save',function(next){
  const connectionRequest = this
  //Check if from and To User id's are same
  if(connectionRequest.toUserId.equals(connectionRequest.fromUserId)){
    throw new Error('Sending Requests to yourself not allowed')
  }
  next()
})

const  ConnectionRequest = mongoose.model('ConnectionRequest',connectionRequestSchema)

module.exports = ConnectionRequest