const express = require('express')
const adminAuth = require('./middleware/auth')
const connectDB =  require('./config/database')
const User = require('./models/user');
const ValidateSignupData = require('./utils/validationData');
const bcrypt = require('bcrypt');
const cookieParser = require('cookie-parser')
const jwt = require('jsonwebtoken');
const {userAuth} = require('./middleware/auth')


const app = express();
const PORT = process.env.PORT|3000
const URL = 'mongodb://localhost:27017/'
const dataBase = 'devTinder'


//Parser from JSON to JS object
app.use(express.json())
app.use(cookieParser())

//API to Add Data
app.post('/signup',async (req,res)=>{
  //Create new Instance of User with Dummy Data and its an async operation
  try {
    ValidateSignupData(req)
    const {firstName,lastName,emailID,password,gender,skills} = req.body; 
    //Encrypt pwd
    const hashedpwd = await bcrypt.hash(password, 10) //10 is std number of salt
    console.log(hashedpwd)
      
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

//Find one User by EmailId
app.post('/user',async (req,res)=>{
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
app.get('/feed',async (req,res)=>{
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
app.delete('/user',async (req,res)=>{
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


app.patch('/user:userId', async (req,res)=>{
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

//Login
app.post('/login',async (req,res)=>{
  try{
   const {emailID,password} = req.body

   const user = await User.findOne({emailID:emailID})
   if(!user){
    throw new Error('User Not Found')
   }
   const isPasswordValid = await bcrypt.compare(password,user.password)
   
   if(!isPasswordValid){
    throw new Error('Invalid Password')
   }else{
    console.log(password)
    console.log(user.password)
    
    //We will pass cookie here 
    //res.cookie('name','token-asasasasasasasasasassxxaxxsxsxsx')
    const token = await jwt.sign({_id:user._id},'Dev@Tinder0509',{
      expiresIn:'1d'
    })
    res.cookie('token',token)
    console.log(token)
    res.send('Login SuccessFull')
   }
  }catch(err){
    res.status(400).send('Not Allowed'+ err.message)
  }
})


//Profile
app.get('/profile',userAuth,async (req,res)=>{
  try{
  const user = req.user  
  res.send('Profile Success '+ user.firstName + '  ' + user.lastName)
  }catch(err){
    res.status(400).send(err.message)
  }
})

connectDB(URL,dataBase).then(()=>{
  console.log('Database Connection Successfull')
  app.listen(PORT,()=>{
    console.log('Server running on Port ',PORT)
  })
}).catch(err=>{


})


///Basic Stuffs abt Node


// app.use('/',(req,res)=>{
//   res.send('Hello from the Use')
// })

// app.get('/',(req,res)=>{
//   res.send('Hello from the server')
// })

// app.get('/user',(req,res)=>{
//   res.send({name:'Rohit',lastName:'Kumar'})
// })

// app.get('/dynamicuser',(req,res)=>{
//   const params = req.query
//   res.send(params)
// })

// app.get('/dynamicuser/:id/:name',(req,res)=>{
//   const params = req.params
//   const query = req.query
//   res.send({...query,...params})
// })


// //It will match get call hello, post call hello and all possible methods
// //Also will match /hello/ssasx
// //Every endpoint starting with /hello and with any HTTP method
// app.use('/hello',(req,res)=>{
//   res.send('Hello Hello Hello')
// })


// app.get('/re?g',(req,res)=>{
//   res.send('Regular Expressions also work in the routes with optional ?')
// })

// app.get('/re+g',(req,res)=>{
//   res.send('Regular Expressions also work in the routes with +')
// })

// app.get('/r(eg)?',(req,res)=>{
//   res.send('Regular Expressions also work in the routes with +')
// })

// app.get('/re*g',(req,res)=>{
//   res.send('Regular Expressions also work in the routes with +')
// })

// app.use('/test',(req,res)=>{
//   res.send('This from Test')
// })



// ///Middle Ware
// app.use(
//   "/middleware",
//   (req,res,next)=>{
//     console.log('First Respose')
//     res.send('First Response')
//     next()
//   },
//   (req,res,next)=>{
//     console.log('Second Respose')
//     res.send('Second Response')
//   }
// )

// //Lets import and add middleware which will authorize admin route
// app.use('/admin',adminAuth)

// app.get('/admin/getAllData',(req,res)=>{
//   res.send('All Users')
// })

// app.get('/admin/deleteUser',(req,res)=>{
//   res.send('Delete a User')
// })



