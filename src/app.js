const express = require("express");

const app = express();

// error handler function
app.use("/", (err, req, res, next) => {
    if(err){
        res.status(500).send("Something went wrong 1 !!!");
    }
});

// request handler function
app.get("/getUserData", (req, res) => {

    throw new Error("error message of thrown error");
    res.status(500).send("User Data sent!!!");
});


// when  below error handler commented and then not commented
app.use("/", (err, req, res, next) => {
    if(err){
        console.log(err.message);
        res.status(500).send("Something went wrong 2 !!!");
    }
});



app.listen(7777, () => {
  console.log("Sever is successfully listening on port 7777...");
});
