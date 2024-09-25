const express = require("express");

const app = express();

app.get("/user", (req, res) => {
    res.send({firstname: "Azam", lastName: "Tamboli"});
});


app.post("/user", (req, res) => {
    // creates a new record in the db
    res.send("New user created and saved to database!");
});


app.patch("/user", (req, res) => {
    // updates data without replacing existing record
    res.send("Data updated successfully without replacing existing record!");
});

app.put("/user", (req, res) => {
    // updated data to db by replacing existing record
    res.send("Updated data to db by replacing existing record!");
});

app.delete("/user", (req, res) => {
    res.send("User data deleted successfully!");
});

app.listen(7777, () => {
    console.log("Sever is successfully listening on port 7777...");
});

