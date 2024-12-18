# Requirements

- Create Account
- Login
- Update your profile
- Feed Page - expolore
- Send Connection's Request
- See Matches
- See Requests we have sent/receive
- Update Profile

# Tech stack

- FE: React
- BE: Node JS
- DB: Mongo

# DB Design and API Design are imp

- DB Design(Mongo)

  - User Collection
    - User name
    - last name
    - pwd
    - gender
  - Connect Request Collection
  - From User ID
  - To User ID
  - status : pending,rejected or accepted, can also be cancelled/ignored

- API Design
- /signup -post API
- /signin -post API
- /profile -get API
- /profile -post API
- /profile -patch API
- /profile -delete API
- /sendRequest
  - ignore
  - interested
- /reviewRequest
  - accept
  - rejected
- /request

# Basic Folder Structures

- package.json
- ^ carot ^x.y.z

  - x: represent major version :: This is a mjor update innthe package and can lead to breaking of code as major updates gen tend to not support backward compatibility.
  - y: represent minor version :: could be bug fix,new feature and it is safe to update this minor version as it will have backward compatibility.
  - z: represent patch : patch could be bug fix and safe to update this patch as it will have backward compatibility.
  - If no ^ and ~ , then package will never auto update
  - ^ & ~ : ^carrot will auto update package in case of minor and patch upgrades,~tilda will update only the patches and not the major and minor.

- package-lock.json
  - This has the exact version installed and also it is a snapshot of all the node_modules dependencies

# Route Handlers

- const app = express()
- app.use('/') -> If any route starts with / it will alsways take this route in the case of .use
- app.use('/hello') -> If any route starts with /hello/**\*\*** it will alsways take this route in the case of .use
- Order of Routes from middleware, in that case order of declaration of order of routes it is important
- app.use

  - app.use('/') -> if written on top will match with all the routes starting /**\***..., anything after /
  - app.use('/hello') -> if written on top will match with all routes starting with /hello/**\*** anything after /hello
  - Thus if app.use generic method is written on top it will overwrite any sub routes written after this handler.
  - Order of Writing Routes is important.
  - .use m=will match both get method and also post methods

- On Browser its a GET API call

# If Global git Configs are not set then do the following

- Open Terminal
- Set git configs globally
- git config --global user.name "Your Name"
- git config --global user.email "Your Email"

# Router Concepts

- Regular expressions in the Router Url also work

  - app.get('/re?g',(req,res)=>{}) This will work and check for optional e. This will work for /reg & /rg as well
  - app.get('/re+g',(req,res)=>{}) This will work and check for more than one occurence of e. This will work for /reg & /reeeeeeeeg as well making e as mandatory and min 1 occurence of 'e'.
  - app.get('/re*g',(req,res)=>{}) This will work and check for anything that starts with 're' in between anything and ends with 'g'. This will work for /reg & /reeeeeeeeg , /reqweg as well making * mark as anything.
  - app.get('/r(eg)?',(req,res)=>{}) This is grouping ()+ or ()? This will work as same as single character but () makes it as group
  - app.get('/',(req,res)=>{}) RegEx also works in the path
  - app.get('/dynamicuser',(req,res)=>{}) Inside call back we can use req.
  - app.get('/dynamicuser',(req,res)=>{ const params = req.query;res.send(params)}). The Url would be /dynamicuser?userId=5&change=true.
  - app.get('/dynamicuser/:id',(req,res)=>{ const params = req.params;const query = req.query;res.send({...query,...params})}) This dynamic Route is the combination of Params and Query. The url /dynamicuser/5?userId=5&change=true.
  - Query params are passed in url with /url?key=value&key2=value2. Use case Pagination & filtering query
  - Route Paramsa are passed in url with /url/50/rohit mapped in node as /url/:userId/:name. Use case specific user info

  # Middleware

  - app.use('/route',(req,res,next)=>{},(req,res,next)=>{})
  - Once the response is sent, and even if we call next() for next method, it will give errors
  - app.get,app.use all can have middlewares, app.use("/route",[rh1,rh2,rh3]) All rh are route Handlers and we have any combination of route handlers with or without array
  - if it has next() then we can call it as Middleware, if it sends Response Back then its called Route Handler

  # Usage of Middleware

  - Authenticating the API Route
  - Add a Authentication Middleware
  - Can write One Authentication Logic at one place and then use it along
  - app.use('/user',authUser,(req,res)=>{})
  - authUser = (req,res,next)=>{}
  - Only for Path which requries Middleware it makes it better to work around with logics
  - # Error Handling
    - try{}catch(){} block
    - throw new Error()
    - Route Handlers also can handle error differently
    - Route Handler (err,req,res,next)=>{}
    - Error Order matters
    - app.use('/',(err,req,res,next)=>{}) This matches all Routes and can be used as wild card
    - app.use('/',(err,req,res,next)=>{if(err){res.status(500).send('Something went Wrong')}})

# Mongo DB cmds

- Use Mongoose package to interact with MongoDB
- Following Cmds are to enable and stop mongodb service
  - brew services start mongodb-community@7.0
  - brew services list
  - brew services stop mongodb-community@7.0
- Good way to connect to DB is async function
- In URL we can add database name , if not then it will be connected to MongoDB cluster
- MongoCluster->Database->Colection->Document
- AS dB conn is async but serverlisten is in sync, good thing is to first connect with DB and then run server
- const connectDB = async (url,db)=>{ await mongoose.connect(url+db)} export this method basic connection, it returns a promise
- connectDB(URL,dataBase).then(()=>{
  console.log('Database Connection Successfull')
  app.listen(PORT,()=>{
  console.log('Server running on Port ',PORT)
  })
  }).catch(err=>{})
- creation of Schema/model, first we create a schema and then we create a model out of schema and finally export the model
- const userSchema = mongoose.schema({name:{type:String}})
- const User = mongoose.model('User',userSchema)
- app.post('/signup',async (req,res)=>{
  const user = new User({
  ...... All data here which is to be saved
  })
  try{
  await user.save()
  }catch(err){
  res.status(400).send('Not able to Add Data')
  }
  })

- http://localhost:3000/signup
- http is imp and we cannot use https as we reqiuire certificate for secure connection
- Two extra variables are also created in the document object which are \_id and \_v unique id and version respectively
- JSON and JS objects are different, over internet or network, we use JSON to communicate but when server receives the JSON it has to convert it to JS object,we have express built in parser which can be used all along with nodejs app, app.use(express.json())

# Mongoose Methods

- Some Commonly used Methods in Mongoose, User is the model
  - Get All : await User.find({})
  - Get user by Email : User.find({emailID:emailID})
  - Delete a User : User.findByIdAndDelete(userId)
  - findByID and findOne are almost same but findById(id) while findOne({\_id:id}), Basically its shorthand
  - patch and put use for update but put makes the whole object replaced while patch makes partial updates
  - const update = await User.findByIdAndUpdate({\_id:userId},data)
  - Delete : const user = await User.findByIdAndDelete(userId)

# Schema Checks in Mongoose Schema

- required:true is added for mandatory fields
  - const userSchema = mongoose.Schema({
    firstName:{
    type:String,
    required:true
    }
    })
- unique:true is added for only unique email ids
  - const userSchema = mongoose.Schema({
    emailID:{
    type:String,
    required:true,
    unique:true
    }
    })
- Add array in Schema Type

  - skills:{
    type:[String]
    }

- default Values : We can also add default values to DB if not passed from UI

  - about:{
    type:String,
    default:"This is a default About of User"
    }

- lowercase : This flag helps to add data to DB in lowercase even if the user tries to enter email in caps

  - emailID:{
    type:String,
    required:true,
    unique:true,
    lowercase:true
    }

- trim : Trimming extra spaces from all end

  - emailID:{
    type:String,
    required:true,
    unique:true,
    lowercase:true,
    trim:true
    }

- minlength: 4 , This is added to have a name of min length 4 in case of string data

  - firstName:{
    type:String,
    required:true,
    trim:true,
    minlength: 4
    }

- min :4 -> This can be added in case of number

  - age:{
    type:Number,
    min:18
    }

- custom Validate Function: By default it will work with new Data Creation and not while update, to make it work when we have a function findByIdandUpdate(), apart from id and data we also have options to be passed and that option can be configured to check for Validations
  - gender:{
    type:String,
    validate(value){
    const allowed = ['male','female','others']
    if(!allowed.includes(value)){
    throw new Error('Gender Not Valid')
    }
    }
    }
  - while Updating : we pass options Object for configuration
    const update = await User.findByIdAndUpdate({\_id:userId},data,{
    returnDocument:"after",
    runValidators:true
    })
- Time Stamp : We have to add timestamp

  - const userSchema = mongoose.Schema({value:{type:sometype}},{timestamps:true})

- Restrictions can also be added at API block inside try catch

- userId can be passed as params in the url
  - To catch userId from the params we can use req.params.userId
  - app.patch('/user:userId',async (req,res)=>{
    const userId = req.params?.userId
    })

# Validations and Sanitizations using External Lib

- we can use validator - npm i validator
- can add validators at Schema level or DB level
- Some common examples are:
  - validators.isEmail(value)
  - validator.isStrongPassword(value)
- validation ensuring that data matches what was requested, and sanitization ensuring that data is secure before being rendered
- Sanitization : Modifies input to ensure it's valid, such as removing unsafe characters or doubling single quotes. Sanitization helps secure data before it's rendered for the end user

# Flow of User Post Data

- Validate the User Data : can use a helper function and call helper function in seperate module and call that in try block before creating User Instance
- Encryption of pwd, we can use bcrypt lib for hashing pwd, const hashedpwd = await bcrypt.hash(password, 10)
- And the creating User Model Instance comes at last

- Authentication
  - store pwd in db using bcrypt lib : const hashedpwd = await bcrypt.hash(password, 10)
  - then login with pwd and compare with hashed pwd
    - used Find One to find the User
    - const user = await User.findOne({emailID:emailID})
    - const isPasswordValid = await bcrypt.compare(password,user.password)
    - As a security purpose , even if email id is not present, send error in Credential
    - Should Not expose extra about credential

# Authentication JWT Cookie

- Process of JWT

  - Login Success
  - Server Will send JWT token to client
  - client will save the token on its side
  - Now on every request we will be sending JWT attached to all the requests sent from client to server

  - Cookies

    - JWT is sent embedded in a cookie
    - And Cookie will travel along with all subsequent requests from client
    - Cookie has expiry
    - If Req sent from expired cookie the UI will be redirected to Login

  - Process of Implementation

    - Create JWT Token
    - res.cookie('name', 'tobi', { domain: '.example.com', path: '/admin', secure: true })
    - 'name': is the name of token
    - 'tobi' is value of cookie
    - {} : options for configuration eg: { expires: new Date(Date.now() + 900000), httpOnly: true }
    - after res.cookie() , we can send res.send('Login Success')
    - while receiving Cookies we need cookie-parser library from express which can be used to extract cookie, just like app.use(express.json()) middleware
    - const cookieParser = require('cookie-parser')
    - app.use(cookieParser())
    - Get Cookies using

      - const cookies = req.cookies
      - console.log(cookies)

    - Creation of JWT Token

      - npm i jsonwebtoken
      - jwt token has 3 parts seperated by dots:
        - 1. Header
        - 2. Paylaod or Data which we want to Hide
        - 3. Signature
      - const jwttoken = await jwt.sign({\_id:user.\_id},secretKeyKnownToOnlyServer), here we are adding userid in the paylaod data to hide which we will retrieve back when validated
      - Then Sending token using cookie req.cookie('token',jwttoken)
      - This token is having hidden information which is the id and we have to extract the token
      - const {token} = req.cookies
      - const decodedMessage = await jwt.verify(token,secretKeyKnownToOnlyServer)
      - decodedMessage will have the \_id

    - Apply Auth Token Validation to Al existing API
    - Best way is to handle it is by creating middlewares namely auth middleware
    - # Auth Middleware
      - Steps to be Followed:
      - Reading token from cookie
      - Validate the Token against user id
      - Find User using decrypted Jwt Token
      - we can take whole auth valdation to different file and export it using exports.module = {auth}
      - Import auth middleware and then can use in all route handlers
      - Auth middleware if authenticated can also attach fetched user
      - req.user = fetchedUser
      - app.get('/profile',userAuth,async (req,res)=>{})
      - fetched user data can be used in the next handler if required
      - we can have options object while creating token and that option can have field to expire the token, {expiresIn:'7d'} This symbolises 7days, we can also have hours
      - we can also expire the cookie and for that as well we can pass options object, while sneding the cookie in response
      - res.cookie('token',token,{
        expires: new Date(Date.now() + 8\*3600000)
        })

# Express Routers for Application

- When we have actual implementation we use Express Router
- const authRouter = express.Router()
- authRouter.post('/signup') This is no different than app.use() for end user like us
- General Convention can be to start using Routes from the begning of the Application

- In app.js : Here the Route request will go 1 by 1 to all routes and check the matching routes
  - app.use('/',authRouter)
  - app.use('/',profileRouter)
  - app.use('/',requestRouter)

# Build Dev Tinder API's

- logout API: Does not matter if the user is logged in or not we can just send cookie back with null value and expire Date.now()
- expires:new Date(Date.now())
- res.
  cookie('token',null,{
  expires:new Date(Date.now())
  })
  .send()

# Connection Requests

- We can store User id of Connection request in same user schema but its not good practice to do so
- Best strategy would be to have it a seperate schema for connection request and let the User collection handle only User Related Data
- create a new scehema for Connectionrequest and type can be mongoose.Types.ObjectId
- fromUserId:{
  type:mongoose.Types.ObjectId
  },
  toUserId:{
  type:mongoose.Types.ObjectId
  }
- status can be created as enum , we gen use enum where we have limited options available,
  viz viz "ignore,interested,accepted,rejected"
- status:{
  type:String,
  enum:{
  values:['ignore','interested','accepted','rejected'],
  message:`{VALUE} is invalid stattus type`
  }
  }
- POST /request/send/interested/:userId
- POST /request/send/ignored/:userId

- The above two Routes can be made dynamic based on what it is :status/:userId
- const ConnectionRequest = require('../models/connectionRequest'); and module.exports = ConnectionRequest are imp else it will give contructor error
- This Dynamic Satatus can have all possible values but sending request and ignoring are the only options should be allowed here

- If Dulicate connection from A->B exists or B->A exists we use mongodb Or condition for query
- const existingConnectionReq = await ConnectionRequest.findOne({
  $or:[
  {fromUserId,toUserId},
  {fromUserId:toUserId,toUserId:fromUserId}
  ]
  })
- Concept of Pre in mongo at Schema level
- In ConnectionRequestModel after schema declaration
- connectionRequestSchema.pre('save',function(){
  const connectionRequest = this
  //Check if from and To User id's are same
  if(connectionRequest.toUserId.equals(connectionRequest.fromUserId)){
  throw new Error('Sending Requests to yourself not allowed')
  }
  next()
  })
- ERR_HTTP_HEADERS_SENT when we write any if condition for API validation do write return statement if using res.status.json({})

# DB Optimization

- When we get lot of Connection request we tend to break the querying time.
- The more the DB will grow it will take time for querying certain data from it.
- Hence we use the concept of indexing
- Indexing can be done on a particular field
- gen when in search in db query we can do indexing of that particular field
- Here we have User Profile and User Collection having lot of objects
- example : emailid can be indexed as it will make login faster
- mongodb makes the field as indexed if that field is marked as unique:true in schema declaration
- when two filed combination comes into picture we call it 'Compound Index'.
- //Compound Index
  connectionRequestSchema.index({fromUserId:1,toUserId:1}) Here 1 means ascending order

# More DB Query

- get All Pending Conenction Request
- One user got lot of connection Request
- That One user will make API calls to view all Connection Request
- userRouter.get('/user/connections/received',authUser,async (req,res)=>{})
- One User will have multiple connection Request and Each Conn Request points to one user in User Collection
- Hence we have to use a concept of Reference as we should not use loops inorder to find abt each connection Request
- const connectionRequestSchema = new mongoose.Schema({
  fromUserId:{
  type:mongoose.Schema.Types.ObjectId,
  required:true,
  ref: 'User'
  }})

- In Code const connectionRequests = await ConnectionRequest.find({
  toUserId:loggedInUser.\_id,
  status:'interested'
  }).populate('fromUserId',['firstName','lastName'])
- If we do not pass the array then it will send everything, including user email and pwd
- Tehnically we are joining tables using ref and populate
- Assuming we want only the referenced data and not the data from existing table
- we can modify data and send only fromUserId as it will have only data which we are filtering from User Collection
- const data = connectionRequests.map(row=>row.fromUserId)
- It will give me data only for fromUserId

- select fields with OR condition, here only from and to userId will be received
- await ConnectionRequest.find({
  $or:[
  {fromUserId:loggedIn._id},
  {toUserId:loggedIn._id}
  ]
  }).select("fromUserId,toUserId")

- There are lot of query Operators in mongo and documnet has it all

- .skip() & .limit() for get pagination working in mongo
  - .skip(0) & .limit(10) it will give first 10
