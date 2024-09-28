const mongoose = require("mongoose");

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
      trim: true
    },
    password: {
      type: String,
      required: true,
      minLength: 8,
      maxLength: 16,
      unique: true,
    },
    age: {
      type: Number,
      min: 18
    },
    gender: {
      type: String,
      validate(value) {
        if (!["male", "female", "others"].includes(value)) {
          throw new Error("Gender data is not valid!");
        }
      },
    },
    photoUrl: {
        type: String,
        default: "https://images.app.goo.gl/LMyWUGfJDvqaj1Fn6"
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
