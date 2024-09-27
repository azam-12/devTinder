const express = require("express");
const connectDB  = require("./config/database");
const User = require("./models/user");


const app = express();


connectDB()
    .then(() => {
        console.log("Database connection established!!!");
        app.listen(7777, () => {
            console.log("Server is successfully listening on port 7777...");
        })
    })
    .catch((err) => {
        console.log("Database cannot be connected!!!");
    });

app.post("/signup", async(req, res) => {
    const user = new User({
        firstName: "Steve",
        lastName: "Jobs",
        emailId: "steve@gmail.com",
        password: "steve@123"
    })

    try {
        await user.save();
        res.send("User created successfully!!!");
    } catch (error) {
        res.status(400).send("Error while saving user" + error.message);        
    }
});

