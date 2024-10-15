const express = require('express')
const adminAuth = require('./middleware/auth')
const connectDB =  require('./config/database')
const User = require('./models/user')

const app = express();
const PORT = process.env.PORT|3000
const URL = 'mongodb://localhost:27017/'
const dataBase = 'devTinder'


//Parser from JSON to JS object
app.use(express.json())

//API to Add Data
app.post('/signup',async (req,res)=>{
  //Create new Instance of User with Dummy Data and its an async operation
  const {firstName,lastName,emailID,password,age,gender} = req.body
  const user = new User({
   firstName,
   lastName,
   emailID,
   password,
   age,
   gender
  })
  
  try {
    await user.save()
    res.send('User Added Successfully')
  } catch (error) {
    res.status(400).send('Something went wrong')
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


app.patch('/user', async (req,res)=>{
  const userId = req.body.userId
  const data = req.body
  
  if(!userId)
    res.send('Please pass User ID!!')
  try{
    const update = await User.findByIdAndUpdate({_id:userId},data)
    res.send(update)
  }catch(err){
    res.send(err)
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



