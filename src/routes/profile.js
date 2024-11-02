const express = require('express')
const router = express.Router()
const {userAuth} = require('../middleware/auth')
const {ValidateEditProfileData} = require('../utils/validationData')

//Profile
router.get('/profile/view',userAuth,async (req,res)=>{
  try{
  const user = req.user  
  res.send('Profile Success '+ user.firstName + '  ' + user.lastName)
  }catch(err){
    res.status(400).send(err.message)
  }
})

//Patch Profile
router.patch('/profile/edit',userAuth, async (req,res)=>{
  try{
    if(!ValidateEditProfileData(req)){
      throw new Error('Invalid Edit Request')
    }
    
    //extract user attached to req who has logged in 
    const loggedInUser = req.user
    Object.keys(req.body).forEach(key=> loggedInUser[key]=req.body[key])
    console.log(loggedInUser)
    console.log(req.body)
    await loggedInUser.save()
    res.json({
      message:`${loggedInUser.firstName}, your profile was updated Successfully`,
      data:loggedInUser
     })   
    }
    
    catch(err){
    res.status(400).send('Not Allowed ' + err.message)
  }
})

//Profile Forget Password
router.post('/profile/forgotpassword',userAuth,async (req,res)=>{
   try{
    const newPassword = req.body.password
    const hashedpwd = await bcrypt.hash(newPassword, 10)
    const loggedInUser = req.user
    loggedInUser['password'] = hashedpwd
    await loggedInUser.save()
    res.json({
      message:`${loggedInUser.firstName}, your profile was updated Successfully`,
     })
   }catch(err){
    res.status(400).send('Not Allowed ' + err.message)
   }
})




module.exports = {
  profileRouter:router
}