const mongoose = require("mongoose");
const validator = require("validator");

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
      minLength: 8,
      maxLength: 16,
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
      validate(value) {
        if (!["male", "female", "others"].includes(value)) {
          throw new Error("Gender data is not valid!" + "\n");
        }
      },
    },
    photoUrl: {
        type: String,
        default: "https://images.app.goo.gl/LMyWUGfJDvqaj1Fn6",
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

module.exports = mongoose.model("User", userSchema);
