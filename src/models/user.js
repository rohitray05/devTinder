const mongoose = require('mongoose')
const validator = require('validator')

const userSchema = mongoose.Schema({
  firstName:{
    type:String,
    required:true,
    trim:true,
    minlength: 4
  },
  lastName:{
    type:String
  },
  emailID:{
    type:String,
    required:true,
    unique:true,
    lowercase:true,
    trim:true,
    validate(value){
      if(!validator.isEmail(value)){
        throw new Error('Email not Valid')
      }
    }
  },
  password:{
    type:String,
    required:true,
    validate(value){
      if(!validator.isStrongPassword(value)){
        throw new Error('Password is not Strong!!!')
      }
    }
  },
  age:{
    type:Number,
    min:18
  },
  gender:{
    type:String,
    lowercase:true,
    validate(value){
      const allowed = ['male','female','others']
      if(!allowed.includes(value)){
        throw new Error('Gender Not Valid')
      }
    }
  },
  photoUrl:{
    type:String,
    default:"https://www.pngall.com/wp-content/uploads/5/User-Profile-PNG.png",
    validate(value){
      if(!validator.isURL(value)){
        throw new Error('Not Correct photoUrl')
      }
    }
  },
  about:{
    type:String,
    default:"This is a default About of User"
  },
  skills:{
    type:[String]
  }
},{
   timestamps:true
})

const User = mongoose.model('User',userSchema)

module.exports = User