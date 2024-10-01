const express = require("express");
const connectDB = require("./config/database");
const User = require("./models/user");
const { validateSignUpData } = require("./utils/validations");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const { userAuth } = require("./middleware/auth");

const app = express();

app.use(express.json());
app.use(cookieParser());

connectDB()
  .then(() => {
    console.log("Database connection established!!!");
    app.listen(7777, () => {
      console.log("Server is successfully listening on port 7777...");
    });
  })
  .catch((err) => {
    console.log("Database cannot be connected!!!");
  });

// create user API
app.post("/signup", async (req, res) => {
  const { firstName, lastName, emailId, password } = req.body;

  try {
    // 1st method
    // const ALLOWED_CREATE = [
    //   "firstName",
    //   "emailId",
    //   "password"
    // ];
    // const isCreateAllowed = Object.keys(data).every((k) =>
    //     ALLOWED_CREATE.includes(k)
    // );
    // if (!isCreateAllowed) {
    //   throw new Error("Cannot create user, mandatory fields are missing!!!");
    // }

    // 2 method explicitly write validation function
    validateSignUpData(req);

    // encrypt password
    const passwordHash = await bcrypt.hash(password, 10);

    const user = new User({
      firstName,
      lastName,
      emailId,
      password: passwordHash,
    });

    console.log("length: " + passwordHash.length);
    await user.save();
    res.send("User created successfully!!!");
  } catch (err) {
    res.status(400).send("Error while creating user: " + err.message + "\n");
  }
});

// post login user
app.post("/login", async (req, res) => {
  const { emailId, password } = req.body;

  try {
    const user = await User.findOne({ emailId });
    if (!user) {
      throw new Error("Invalid Credentials !!!");
    }

    // We have added handler method to off-load the method to user schema methods and becomes reusable (makes code look cleaner and best practise)
    const isPasswordValid = await user.validatePassword(password);

    if (!isPasswordValid) {
      throw new Error("Invalid Credentials !!!");
    } else {

      // We have added handler method to off-load the method to user schema methods and becomes reusable (makes code look cleaner and best practise)
      const token = await user.getJWT();

      // will expire after 7 days
      res.cookie("token", token, { expires: new Date(Date.now() + 7 * (24 * 3600000)) });
      
      res.send("Login successfull!!!");
    }
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
});


//  get user profile using cookie 
app.get("/profile", userAuth, async(req, res) => {

  try {
    const user = req.user;
    res.send(user);
    
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
});

app.post("/sendConnectionRequest", userAuth, async(req, res) => {
  try {
   const user = req.user;  
   res.send(user.firstName + " sent the connection request!"); 
  } catch (err) {
    res.status(400).send("ERROR: ", err.message);
  }
})



