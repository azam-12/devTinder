const express = require("express");

const app = express();

app.use("/test", (req, res) => {
    res.send("Hello fron the server!");
});


app.use("/hello", (req, res) => {
    res.send("Hello hello hello!");
});


app.use("/", (req, res) => {
    res.send("Namaste Akshay!!!!!!");
});


app.listen(7777, () => {
    console.log("Sever is successfully listening on port 7777...");
});

