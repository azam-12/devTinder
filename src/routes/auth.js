const express = require("express");
const authRouter = express.Router();

const { validateSignUpData } = require("../utils/validations");
const bcrypt = require("bcrypt");
const User = require("../models/user");

// create user API
authRouter.post("/signup", async (req, res) => {
    const { firstName, lastName, emailId, password } = req.body;
  
    try {
      validateSignUpData(req);
  
      // encrypt password
      const passwordHash = await bcrypt.hash(password, 10);
  
      const user = new User({
        firstName,
        lastName,
        emailId,
        password: passwordHash,
      });
  
      await user.save();
      res.send("User created successfully!!!");
    } catch (err) {
      res.status(400).send("Error while creating user: " + err.message + "\n");
    }
  });
  
  // post login user
  authRouter.post("/login", async (req, res) => {
    const { emailId, password } = req.body;
    try {
      const user = await User.findOne({ emailId });
      if (!user) {
        throw new Error("Invalid Credentials !!!");
      }
      // We have added handler method to off-load the method to user schema methods and becomes reusable (makes code look cleaner and best practise)
      const isPasswordValid = await user.validatePassword(password);
      if (!isPasswordValid) {
        console.log("isPasswordValid: ", isPasswordValid);
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


  module.exports = authRouter;