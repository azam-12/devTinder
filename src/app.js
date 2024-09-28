const express = require("express");
const connectDB = require("./config/database");
const User = require("./models/user");

const app = express();

app.use(express.json());

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
  const user = new User(req.body);

  try {
    await user.save();
    res.send("User created successfully!!!");
  } catch (error) {
    res.status(400).send("Error while saving user" + error.message);
  }
});


// get single user API
app.get("/user", async (req, res) => {
  try {
    // find() will find all the user with given emailId
    // const users = await User.find({ emailId: req.body.emailId});

    // findOne() will find only one user with given emailId
    const users = await User.findOne({ emailId: req.body.emailId });
    if (!users) {
      res.status(404).send("User not found");
    } else {
      res.send(users);
    }
  } catch (err) {
    res.status(400).send("Something went wrong!!!");
  }
});


// get all the users API
app.get("/feed", async (req, res) => {
  try {
    // will return all the users
    const users = await User.find({});
    if (!users) {
      res.status(404).send("User not found!!!");
    } else {
      res.send(users);
    }
  } catch (err) {
    res.status(400).send("Something went wrong!!!");
  }
});


// get user by ID API
app.get("/userById", async (req, res) => {
  try {
    const users = await User.findById({ _id: req.body.id });
    if (!users) {
      res.status(404).send("User not found!!!");
    } else {
      res.send(users);
    }
  } catch (err) {
    res.status(400).send("Something went wrong!!!");
  }
});


// delete user API
app.delete("/user", async (req, res) => {
  try {
    // The uncommented line is shorthand for commented line
    // await User.findByIdAndDelete({ _id: req.body.userId });
    const lastUserDeleted = await User.findByIdAndDelete(req.body.userId);
    if (lastUserDeleted) {
      res.send(lastUserDeleted + "\n User deleted successfully!!!");
    } else {
      res.status(404).send("User not found!!!");
    }
  } catch (err) {
    res.status(400).send("Something went wrong!!!");
  }
});


// update user by ID API
app.patch("/user", async(req, res) => {
    try {
        const userId = req.body.userId;
        const data = req.body;
        // The uncommented line is shorthand for commented line
        // const user = User.findByIdAndUpdate({ _id: userId }, data)
        const user = await User.findByIdAndUpdate(userId, data, {
            returnDocument:"after", runValidators: true }
        );
        if(user){
            res.send(user + "\n User updated successfully!!");
        }else{
            res.status(404).send("User not found!!!");
        }
    } catch (err) {
        res.status(400).send("UPDATE FAILED:" + err.message);
    }
});


// update user by email ID API
app.patch("/userByEmailId", async(req, res) => {
    const emailId = req.body.emailId;
    const data = req.body; 
    try {
        const user = await User.findOneAndUpdate( { emailId }, data, {   
                returnDocument: "before", runValidators: true 
            }
        );
        if(user){
            res.send(user + "\n User updated successfully!!!");
        }else{
            res.status(400).send("User not found!!!");
        }
    } catch (error) {
        res.status(400).send("Something went wrong!!!");
    }
});

