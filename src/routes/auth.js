const express = require('express');
const User = require('../models/user');
const {ValidateSignupData} = require('../utils/validationData');
const bcrypt = require('bcrypt');


const router = express.Router();



router.post('/signup',async (req,res)=>{
//Create new Instance of User with Dummy Data and its an async operation
try {
  ValidateSignupData(req)
  const {firstName,lastName,emailID,password,gender,skills} = req.body; 
  //Encrypt pwd
  const hashedpwd = await bcrypt.hash(password, 10) //10 is std number of salt
    
  const user = new User({
    firstName,
    lastName,
    emailID,
    gender,
    skills,
    password:hashedpwd
  })
  await user.save()
  res.send('User Added Successfully')
} catch (error) {
  res.status(400).send('Add User Not Allowed ' + error.message)
}{

}
})


//Login
router.post('/login',async (req,res)=>{
  try{
   const {emailID,password} = req.body

   const user = await User.findOne({emailID:emailID})
   if(!user){
    throw new Error('User Not Found')
   }
   const isPasswordValid = await user.validatePassword(password)
   if(!isPasswordValid){
    throw new Error('Invalid Password')
   }else{
    const token = await user.getJWT();
    res.cookie('token',token)
    res.send('Login SuccessFull')
   }
  }catch(err){
    res.status(400).send('Not Allowed '+ err.message)
  }
})


//Logout
router.post('/logout', async (req,res)=>{
  res.
  cookie('token',null,{
    expires:new Date(Date.now())
  })
  .send('Logout Successfully!!')
})


module.exports = {
  authRouter:router
}