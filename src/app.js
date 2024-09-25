const express = require("express");

const app = express();

app.get("/a(bc)+d", (req, res) => {
    res.send({firstname: "Azam", lastName: "Tamboli"});
});

app.get("/ab*cd", (req, res) => {
    res.send({firstname: "Azam", lastName: "Tamboli"});
});

app.get("/ab+c", (req, res) => {
    res.send({firstname: "Azam", lastName: "Tamboli"});
});


app.get("/ab?c", (req, res) => {
    res.send({firstname: "Azam", lastName: "Tamboli"});
});

app.get(/a/, (req, res) => {
    res.send({firstname: "Azam", lastName: "Tamboli"});
});

app.get(/.*fly$/, (req, res) => {
    res.send({firstname: "Azam", lastName: "Tamboli"});
});

app.get("/user?userId=101&password=testing", (req, res) => {
    console.log(req.body);
    res.send({firstname: "Azam", lastName: "Tamboli"});
});

app.get("/user/:userId/:name/:password", (req, res) => {
    console.log(req.params);
    res.send({firstname: "Azam", lastName: "Tamboli"});
});


app.listen(7777, () => {
    console.log("Sever is successfully listening on port 7777...");
});

