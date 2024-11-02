const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
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
    enum:{
      values:['male','female','others'],
      message:`{VALUE} Not Valid Gender`
    }
    // validate(value){
    //   const allowed = ['male','female','others']
    //   if(!allowed.includes(value)){
    //     throw new Error('Gender Not Valid')
    //   }
    // }
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

userSchema.methods.getJWT = async function(){
  //const user = this;
  //'this' represents current instance of the user
  //As we are using this keyword, arrow functions cannot be used here 
  const token = await jwt.sign({_id:this._id},'Dev@Tinder0509',{
    expiresIn:'1d'
  })
  return token
}


userSchema.methods.validatePassword = async function(passwordPassedByUser){
  const user = this
  const hashedPassword = user.password
  const isPasswordValid = await bcrypt.compare(passwordPassedByUser,hashedPassword)
  return isPasswordValid
}

const User = mongoose.model('User',userSchema)

module.exports = User