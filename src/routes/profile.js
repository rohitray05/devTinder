const express = require('express')
const router = express.Router()
const {userAuth} = require('../middleware/auth')


//Profile
router.get('/profile',userAuth,async (req,res)=>{
  try{
  const user = req.user  
  res.send('Profile Success '+ user.firstName + '  ' + user.lastName)
  }catch(err){
    res.status(400).send(err.message)
  }
})


module.exports = {
  profileRouter:router
}