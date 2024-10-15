const mongoose = require('mongoose')

const connectDB = async (url,db)=>{
  await mongoose.connect(url+db)
}

module.exports = connectDB