const jwt = require('jsonwebtoken');
const User = require('../models/user')

const userAuth = async (req,res,next) => {
  //Read Token from the Request
  try{
  if(!req.cookies){
      throw new Error('No Cookie')
  }   
  const {token} = req.cookies
  if(!token){
    throw new Error('No Token Provided')
  }
  const decodedMessage  =  await jwt.verify(token,'Dev@Tinder0509')
  if(!decodedMessage || !decodedMessage._id){
    throw new Error('Invalid Authentication')
  }
  const { _id } = decodedMessage 
  //Find user Using ID
  const user = await User.findById(_id)
  if(!user){
    throw new Error('User Not Found')
  }
  //Since we found The User we can attach that to req and pass to next Route Handler
  req.user = user
  next()
  }catch(error){
    res.status(400).send("Error: "+ error.message)
  }
}


module.exports = {
  userAuth
}






//Generally we write Middleware using app.use
//As we write is for all Requests 
// const adminAuth = (req,res,next)=>{
//   const token = "asasasas";
//   const isAdminAuthorized = token === "xyz";
//   if(!isAdminAuthorized){
//     res.status(401).send('Unauthorized Request')
//   }else{
//     next()
//   }
// }