const mongoose = require('mongoose')

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
    trim:true
  },
  password:{
    type:String,
    required:true
  },
  age:{
    type:Number,
    min:18
  },
  gender:{
    type:String,
    validate(value){
      const allowed = ['male','female','others']
      if(!allowed.includes(value)){
        throw new Error('Gender Not Valid')
      }
    }
  },
  photoUrl:{
    type:String,
    default:"https://www.pngall.com/wp-content/uploads/5/User-Profile-PNG.png"
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