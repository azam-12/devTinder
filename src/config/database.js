const mongoose = require("mongoose");

const connectDB = async() => {
    await mongoose.connect("mongodb+srv://azaminotebook:z5Fkywy46P7f823J@cluster0.tcfbre3.mongodb.net/devTinder");
}

module.exports = connectDB;