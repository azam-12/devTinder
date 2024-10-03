const express = require("express");
const userRouter = express.Router();

const { userAuth } = require("../middleware/auth");
const ConnectionRequest = require("../models/connectionRequest");

/**
 *  GET all the loggedIn User's connections requests
 */
userRouter.get("/user/request/received", userAuth, async(req, res) => {
    try {
        const loggedInUser = req.user;

        const connectionRequests = await ConnectionRequest.find({
            toUserId: loggedInUser.id,
            status: "interested"
        }).populate(
            "fromUserId",
            "firstName lastName photoUrl age gender skills about"
        );

        if(!connectionRequests){
            return res.status(404).json({
                message: "No connections exists!"
            });
        }

        res.json({
            message: "Following are the connections of the user!",
            data: connectionRequests
        });

    } catch (err) {
        res.status(400).send("ERROR: " + err.message);
    }
});


module.exports = userRouter;