const mongoose = require("mongoose");


const connectionRequestSchema = new mongoose.Schema({
    fromUserId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",    
        require: true,
    },
    toUserId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        require: true,
    },
    status: {
        type: String,
        enum: {
            values: [ "ignored", "interested",  "accepted", "rejected" ],
            message: `{VALUE} is incorrected status type`,
        }
    }
},
    {
        timestamps: true,
    } 
);

/**
 *   Since one user can have 100 or more connections so this collection records size will increase 
 *   exponentially so we need indexes and we have created a compound index 
 */ 
connectionRequestSchema.index({ fromUserId: 1, toUserId: 1 });

/**
 *   Here we use schema.pre method to validate if user is sending request to himself
 *   And the function will always be normal function not an arrow function so its first line begins with
 *   assigning "this" keyword to a variable. Here next is very necessary for control to move forward 
 *   because it will not move forward by itself      
 */
connectionRequestSchema.pre("save", function (next) {
    const connectionRequest = this;

    if(connectionRequest.fromUserId.equals(connectionRequest.toUserId)){
        throw new Error("Cannot send connection request to yourself!");
    }
    next();
});


const ConnectionRequestModel = new mongoose.model("ConnectionRequest", connectionRequestSchema);

module.exports = ConnectionRequestModel;