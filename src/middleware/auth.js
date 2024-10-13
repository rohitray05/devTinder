//Generally we write Middleware using app.use
//As we write is for all Requests 
const adminAuth = (req,res,next)=>{
  const token = "asasasas";
  const isAdminAuthorized = token === "xyz";
  if(!isAdminAuthorized){
    res.status(401).send('Unauthorized Request')
  }else{
    next()
  }
}

module.exports = adminAuth