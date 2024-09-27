const express = require("express");
const connectDB  = require("./config/database");
const User = require("./models/user");


const app = express();

app.use(express.json());


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
    const user = new User(req.body);

    try {
        await user.save();
        res.send("User created successfully!!!");
    } catch (error) {
        res.status(400).send("Error while saving user" + error.message);        
    }
});


app.get("/user", async(req, res) => {
    
    try {
        // find() will find all the user with given emailId
        // const users = await User.find({ emailId: req.body.emailId});

        // findOne() will find only one user with given emailId
        const users = await User.findOne({ emailId: req.body.emailId});
        if(!users){
            res.status(404).send("User not found");
        }else{
            res.send(users);
        }

    } catch (err) {
        res.status(400).send("Something went wrong!!!")
    }
});



app.get("/feed", async(req, res) => {
    try {
        // will return all the users
        const users = await User.find({});
        if(!users){
            res.status(404).send("User not found!!!");
        }else{
            res.send(users);
        }
    } catch (err) {
        res.status(400).send("Something went wrong!!!")
    }
});


app.get("/userById", async(req, res) => {
    try {
        const users = await User.findById({ _id: req.body.id });
        if(!users){
            res.status(404).send("User not found!!!");
        }else{
            res.send(users);
        }
    } catch (err) {
        res.status(400).send("Something went wrong!!!");
    }
});