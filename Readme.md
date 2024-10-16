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
  - This has the exact version installed and also it is a snapshot of all the node_modeules dependencies

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
