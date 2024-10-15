const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");


const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      minLength: 4,
      maxLength: 50,
    },
    lastName: {
      type: String,
    },
    emailId: {
      type: String,
      required: true,
      lowercase: true,
      unique: true,
      trim: true, 
      validate(value){
        if(!validator.isEmail(value)){
            throw new Error("Invalid email ID: "+ value + "\n");
        }
      }
    },
    password: {
      type: String,
      required: true,
      unique: true,
      validate(value){
        if(!validator.isStrongPassword(value)){
            throw new Error("Enter strong password: "+ value +"\n");
        }
      }
    },
    age: {
      type: Number,
      min: 18
    },
    gender: {
      type: String,

      // Method 1 for validation
      // validate(value) {
      //   if (!["male", "female", "others"].includes(value)) {
      //     throw new Error("Gender data is not valid!" + "\n");
      //   }
      // },

      // Method 2 for validation (best practise)
      enum: {
        values: ["male", "female", "others"],
        message: `{VALUES} is not a gender type!`
      }
    },
    photoUrl: {
        type: String,
        default: "",
        validate(value){
            if(!validator.isURL(value)){
                throw new Error("Invalid photoUrl: "+ value + "\n");
            }
          }
    },
    about: {
        type: String,
        default: "This is default about of the user!"
    },
    skills: {
        type: [String],
    }
  },
  {
    timestamps: true,
  }
);


userSchema.methods.getJWT  = async function () {
  const user = this;

  const token = await jwt.sign( { _id: user._id } , "DEV@Tinder$790", { expiresIn: "7d" } );

  return token;
}


userSchema.methods.validatePassword = async function (passwordInputByUser) {
  const user = this;
  const passwordHash = user.password; 

  // 1st paramet shuould always be the password from the request and 2nd will from database
  const isPasswordValid = await bcrypt.compare(
    passwordInputByUser,
    passwordHash,
  );

  return isPasswordValid;
}


module.exports = mongoose.model("User", userSchema);
