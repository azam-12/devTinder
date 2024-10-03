Episode -03
- Create a repository
- Initialize the repository
- node_modules, package.json, package_lock.json?
- Install express
- Create a server
- Listen to port 7777
- Write request handlers for /test, /hello
- Install nodemon and update scripts inside package.json
- What are dependencies
- What is the use of "-g" while npm install
- Difference between tilde and caret (~ vs ^)


Episode -04
- Initialize git
- .gitignore
- Create a remote repo on github
- Push all code to remote login
- Play with routes and routes extensions ex /hello, /, /hello/2, /xyz
- Order of the routes matter a lot
- Install postman app and make a workspace/collection > test API call
- Write logic to handle GET, POST, PATCH, PUT, DELETE API calls and test them on Postman
- Explore different kind of routing and use of ?, +, *, () in the routes
- Use of regex in routes /a/, /.*fly$/
- Reading the query params in the routes
- Reading the dynamic routes  


Episode -05
- Multiple route handlers - Play with the code
- next()
- next function and errors along with res.send()
- Practise - app.use("/route", rH1, [rH2, rH3], rH4, rH5)  
- What is a middleware? and why do we need it?
- How express JS basically handles requests behind the scenes?
- app.use vs app.all
- Write a dummy auth middleware for admin
- Write a dummy auth middleware for all user routes except /user/login
- Error handling using app.use("/", (err, req, res, next) = {})


Episode -06
- Create a free cluster on MomgoDB official website aka Mongo Atlas
- Install Mongoose library
- Connect your application to the Database "Connection-url"/devTinder
- Call the connectDB function and connect to database before starting application on 7777
- Create a userSchema & user model
- Create a POST /signup API to add data to database
- Push some documents using API calls from postman
- Error handling using try-catch


Episode -07
- JS object vs JSON (Difference)
- Add the express.json middleware to your app
- Make your signup API dynamic from the end user
- User.findOne() with duplicate email ids, which object will be returned
- API - Get user by email
- API - Feed API - Get/feed - get all the users from the database
- API - Get user by ID
- Create a user delete API
- Difference between PATCH and PUT
- API - Update a user
- Explore the Mongoose Documentation for Model methods
- What are options in a Model.findOneAndUpdate method, explore more about it
- API - Update the user with email ID


Episode -08
- Explore Schema Type options from the documentation
- Add required, unique, minLength, min, trim, lowercase,
- Add Default
- Create custom validation function for gender
- Improve the DB Schema - PUT appropriate validations on each field in Schema
- Add timestamps to the user Schema
- Add API level validations on PATCH request and signup POST request
- Data Sanitizing - Add API validations for each field 
- Install validator
- Explore the validator library functions and use validator functions for password, email and photoUrl
- NEVER TRUST req.body
 
### NOTE: If you face problem during user login a bugfix was made in episode 11 (bug was at useSchema.methods - this keyword)


Episode -09
- Validate data in Signup API
- Install bcrypt package
- Create a PassworhHash using bcrypt.hash and save the user with encrypted password
- Create login API
- Compare passwords and throw error if email or password is invalid


Episode -10
- Install cookie-parser 
- Just send a dummy cookie to the user
- Create GET /profile API and check if you get the cookie back
- Install jsonwebtoken
- In login API, after email and password validation create a jwt token and send back to user in cookies
- Read the cookies inside your profile API and find the logged in user
- userAuth Middleware
- Add the userAuth Middleware in profile API and a new sentConnectionRequest API
- Set the expiry of JWT token and cookies for 7 days
- Create user Schema Method to getJWT()
- Create UserSchema method to comparePassword(passwordInputByUser)


Episode -11
- Explore Tinder APIs 
- Create a list of all APIs you can think of in Dev Tinder
- Group multiple routes under respective routers
- Read documentation for express.router
- Create routes folder for managing auth, profile, request routers
- Create authRouter, profileRouter, requestRouter
- Import these routers in app.js
- Create POST /logout API
- Create PATCH /profile/edit API
- Test all APIs
- Create PATCH /profile/password API => forgot password API
- Make sure you validate all data in every POST, PATCH APIs


Episode -12
- Create a connection Request Schema
- Send Connection Request API
- Proper validation od Data
- Think about all corner cases and handle them
- Ream more about $or query and $and query in mongoDB - https://www.mongodb.com/docs/manual/reference/operator/query-logical/
- schema.pre("save") function in mongoose 
- Read more about index in MongoDB
- Why should we not create a lot of indexes in DB?
- Why do we neeed index in DB?
- What are the advantages and disadvantages of creating index?
- Read this article about compound indexes - https://www.mongodb.com/docs/manual/core/indexes/index-types/index-compound/
- ALWAYS THINK ABOUT CORNER CASES
