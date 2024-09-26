const express = require("express");
const { adminAuth, userAuth } = require("./middleware/auth")

const app = express();



app.use("/admin", adminAuth);

app.use("/admin/getAllData", (req, res) => {
    res.send("Admin Data sent!!!")
});



app.use("/user", userAuth);

app.get("/user/getAllData", (req, res) => {
    res.send("User Data Sent!!!");
});

app.post("/user/createUser", (req, res) => {
    res.send("User Created!!!");
});

app.put("/user/modifyUser", (req, res) => {
    res.send("User modified using put!!!");
});

app.patch("/user/editUser", (req, res) => {
    res.send("User edited using patch!!!");
});

app.delete("/user/delete", (req, res) => {
    res.send("User deleted successfully!!!");
});



app.listen(7777, () => {
  console.log("Sever is successfully listening on port 7777...");
});
