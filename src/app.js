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
  const {firstName,lastName,emailID,password} = req.body
  const user = new User({
   firstName,
   lastName,
   emailID,
   password
  })
  
  try {
    await user.save()
    res.send('User Added Successfully')
  } catch (error) {
    res.status(400).send('Something went wrong')
  }{

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



