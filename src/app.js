const express = require('express')
const adminAuth = require('./middleware/auth')

const app = express();

// app.use('/',(req,res)=>{
//   res.send('Hello from the Use')
// })

app.get('/',(req,res)=>{
  res.send('Hello from the server')
})

app.get('/user',(req,res)=>{
  res.send({name:'Rohit',lastName:'Kumar'})
})

app.get('/dynamicuser',(req,res)=>{
  const params = req.query
  res.send(params)
})

app.get('/dynamicuser/:id/:name',(req,res)=>{
  const params = req.params
  const query = req.query
  res.send({...query,...params})
})


//It will match get call hello, post call hello and all possible methods
//Also will match /hello/ssasx
//Every endpoint starting with /hello and with any HTTP method
app.use('/hello',(req,res)=>{
  res.send('Hello Hello Hello')
})


app.get('/re?g',(req,res)=>{
  res.send('Regular Expressions also work in the routes with optional ?')
})

app.get('/re+g',(req,res)=>{
  res.send('Regular Expressions also work in the routes with +')
})

app.get('/r(eg)?',(req,res)=>{
  res.send('Regular Expressions also work in the routes with +')
})

app.get('/re*g',(req,res)=>{
  res.send('Regular Expressions also work in the routes with +')
})

app.use('/test',(req,res)=>{
  res.send('This from Test')
})



///Middle Ware
app.use(
  "/middleware",
  (req,res,next)=>{
    console.log('First Respose')
    res.send('First Response')
    next()
  },
  (req,res,next)=>{
    console.log('Second Respose')
    res.send('Second Response')
  }
)

//Lets import and add middleware which will authorize admin route
app.use('/admin',adminAuth)

app.get('/admin/getAllData',(req,res)=>{
  res.send('All Users')
})

app.get('/admin/deleteUser',(req,res)=>{
  res.send('Delete a User')
})



//Error Handling




const PORT = process.env.PORT|3000
app.listen(PORT,()=>{
  console.log('Server running on Port ',PORT)
})