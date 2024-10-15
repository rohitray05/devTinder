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
  try {
    const sanitizeAndValidate = (data)=>{
      const {firstName,lastName,emailID,password,age,gender,skills} = data
      if(firstName.length>10){
        throw new Error('First Name Cannot be More than 10 Characters')
      }else if(lastName.length>10){
        throw new Error('lastName Name Cannot be More than 10 Characters')
      }else if(emailID.length > 10){
        //can also add Regex pattern
        throw new Error('Email  Cannot be More than 10 Characters')
      }else if(password.length > 10 ){
        //password pattern can also be added here 
        throw new Error('Password  Cannot be More than 10 Characters')
      }else if(age>=18 && age<= 40 ){
        //password pattern can also be added here 
        throw new Error('Age not in Range')
      }else if(skills.length > 5 ){
        throw new Error('Only 5 skills allowed')
      } 
    }

    sanitizeAndValidate(req.body)
  
    const user = new User(req.body)
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



