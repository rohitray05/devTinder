const express = require('express')
const connectDB =  require('./config/database')
const cookieParser = require('cookie-parser')

const {authRouter} = require('./routes/auth')
const {profileRouter} = require('./routes/profile')
const {requestRouter} = require('./routes/requests')
const {ConnectionRequestRouter} = require('./routes/connectionRequest')
const {userRouter} = require('./routes/user')

const app = express();
const PORT = process.env.PORT|3000
const URL = 'mongodb://localhost:27017/'
const dataBase = 'devTinder'


//Parser from JSON to JS object
app.use(express.json())
app.use(cookieParser())

app.use('/',authRouter)
app.use('/',profileRouter)
app.use('/',requestRouter)
app.use('/',ConnectionRequestRouter)
app.use('/',userRouter)

connectDB(URL,dataBase).then(()=>{
  console.log('Database Connection Successfull')
  app.listen(PORT,()=>{
    console.log('Server running on Port ',PORT)
  })
}).catch(err=>{


})