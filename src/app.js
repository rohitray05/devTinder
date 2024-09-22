const express = require('express')


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

app.use('/hello',(req,res)=>{
  res.send('Hello Hello Hello')
})

app.use('/test',(req,res)=>{
  res.send('This from Test')
})


const PORT = process.env.PORT|3000
app.listen(PORT,()=>{
  console.log('Server running on Port ',PORT)
})