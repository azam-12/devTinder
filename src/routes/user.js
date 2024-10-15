const express = require("express");
const userRouter = express.Router();

const { userAuth } = require("../middleware/auth");
const ConnectionRequest = require("../models/connectionRequest");
const User = require("../models/user");

const USER_SAFE_DATA = "firstName lastName photoUrl age gender skills about";

/**
 *  GET all the loggedIn User's connections requests
 */
userRouter.get("/user/request/received", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;

    const connectionRequests = await ConnectionRequest.find({
      toUserId: loggedInUser.id,
      status: "interested",
    }).populate("fromUserId", USER_SAFE_DATA);

    if (!connectionRequests) {
      return res.status(404).json({
        message: "No connections exists!",
      });
    }

    res.json({
      message: "Following are the connections of the user!",
      data: connectionRequests,
    });
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
});

/**
 *  GET all the accepted requests of the user by him or by others
 */
userRouter.get("/user/connections", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;

    const connectionRequests = await ConnectionRequest.find({
      $or: [
        { toUserId: loggedInUser._id, status: "accepted" }, 
        { fromUserId: loggedInUser._id, status: "accepted" }
    ],
    })
      .populate("fromUserId", USER_SAFE_DATA)
      .populate("toUserId", USER_SAFE_DATA);

    if (!connectionRequests) {
      return res.json({ message: "No connections found!" });
    }

    /**
     *  Here we get all the user connections but these are pairs logged in user and other connected user
     */
    // console.log(connectionRequests);

    /**
     *  The pair consists of logged in user info and the other connected user info so we need to 
     *  segregate the other user info and so we apply map and collect data for only other users in the pair
     * 
     */
    const data = connectionRequests.map( (row) => {
      if(row.fromUserId._id.toString() === loggedInUser._id.toString()){
        return row.toUserId;
      }
      return row.fromUserId;
    });


    res.json({
      message: "Below are all " + loggedInUser.firstName + "'s " + "connections",
      data,
    });
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
});

/**
 *  GET connection feed for the logged in user
 */
userRouter.get("/user/feed", userAuth, async(req, res) => {

  const page = parseInt(req.query.page) || 1;
  let limit = parseInt(req.query.limit) || 10;
  limit > 50 ? 50 : limit;
  const skip = (page-1) * limit;
  
  try {
    const loggedInUser = req.user;

    // User should see all the user cards except
    // 0. his own card
    // 1. his connections
    // 2. ignored people
    // 3. already sent the connection

    /**
     *  We first find all the connected users but the result consists of loggedInUser Id and other person user Id
     *  
     */
    const connectionRequests = await ConnectionRequest.find({
      $or: [
        { fromUserId: loggedInUser._id },
        { toUserId: loggedInUser._id }
      ]
    }).select("fromUserId toUserId");


    const hideUsersFromFeed = new Set();
    
    /**
     *  By definition a set cannot hold redundant entries so hideUsersFromFeed will have unique Ids.
     */
    connectionRequests.forEach((req) => {
      hideUsersFromFeed.add(req.fromUserId.toString());
      hideUsersFromFeed.add(req.toUserId.toString());
    });


    /**
     *  Take all the users not in hideUsersFromFeed and loggedInUser so the below condition
     */
    const userFeed = await User.find({
      $and: [
        { _id: { $nin: Array.from(hideUsersFromFeed) } },
        { _id: { $ne: loggedInUser._id } }
      ]
    }).select(USER_SAFE_DATA).skip(skip).limit(limit);


    res.json({ 
      message: loggedInUser.firstName + " feed",
      data: userFeed
     })

  } catch (err) {
    res.status(400).send("ERROR: " + err.message)
  }


});

module.exports = userRouter;
