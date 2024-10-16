
const validator = require('validator')

const ValidateSignupData = (req)=>{
  const {firstName,lastName,emailID,password,age,gender,skills} = req.body
  if(!firstName || firstName.length>10){
    throw new Error('First Name Cannot be More than 10 Characters')
  }else if(!lastName || lastName.length>10){
    throw new Error('lastName Name Cannot be More than 10 Characters')
  }else if(!emailID || !validator.isEmail(emailID)){
    //can also add Regex pattern
    throw new Error('Email  Cannot be More than 10 Characters')
  }else if(password.length > 10 ){
    //password pattern can also be added here 
    throw new Error('Password  Cannot be More than 10 Characters')
  }else if(!(age>=18 && age<= 40) ){
    //password pattern can also be added here 
    throw new Error('Age not in Range')
  }else if(skills.length > 5 ){
    throw new Error('Only 5 skills allowed')
  } 
}

module.exports = ValidateSignupData