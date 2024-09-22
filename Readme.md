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
