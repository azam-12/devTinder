const express = require("express");
const profileRouter = express.Router();

const { userAuth } = require("../middleware/auth");
const User = require("../models/user");
const { validateProfileData } = require("../utils/validations");
const validator = require("validator");
const bcrypt = require("bcrypt");

//  get user profile using cookie
profileRouter.get("/profile/view", userAuth, async (req, res) => {
  try {
    const user = req.user;
    res.send(user);
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
});


// edit profile data of the user
profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
  try {
    if (!validateProfileData(req)) {
      throw new Error("Invalid Edit Request!!!");
    }

    const loggedInUser = req.user;

    Object.keys(req.body).forEach((key) => (loggedInUser[key] = req.body[key]));

    await loggedInUser.save();

    res.json({
      message: `${loggedInUser.firstName}, your profile updated successfully!!!`,
      data: loggedInUser,
    });

  }catch (err) {
    res.status(400).send("ERROR : " + err.message);
  }
});

// reset password of the user
profileRouter.patch("/profile/password", userAuth, async(req, res) => {
    const { oldPassword, newPassword } = req.body;
    const loggedInUser = req.user;

    try {
        const isOldPasswordValid = await loggedInUser.validatePassword(oldPassword);
        if(!isOldPasswordValid){
            throw new Error("The old password does not match!!!");
        }
        
        if(!validator.isStrongPassword(newPassword)){
            throw new Error("Please enter strong password!!!");
        }

        // encrypt password
        const newPasswordHash = await bcrypt.hash(newPassword, 10);

        loggedInUser.password = newPasswordHash;
        await loggedInUser.save();

        res.json({
            message: `${loggedInUser.firstName}, your password changed successfully!!!`,
            data: loggedInUser
        });
        
    } catch (err) {
        res.status(400).send("ERROR: "+ err.message);
    }
});

module.exports = profileRouter;
