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

    const savedUser = await user.save();
    const token = await savedUser.getJWT();

    res.cookie("token", token, {
      expires: new Date(Date.now() + 8 * 3600000),
    });
    res.json({ message: "User saved Successfully!!", data: savedUser });
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
      throw new Error("Invalid Credentials !!!");
    } else {
      // We have added handler method to off-load the method to user schema methods and becomes reusable (makes code look cleaner and best practise)
      const token = await user.getJWT();

      // will expire after 7 days
      res.cookie("token", token, {
        expires: new Date(Date.now() + 7 * (24 * 3600000)),
      });

      res.send(user);
    }
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
});

authRouter.post("/logout", (req, res) => {
  res.cookie("token", null, { expires: new Date(Date.now()) });
  res.send("Logout successfull!!!");
});

module.exports = authRouter;
