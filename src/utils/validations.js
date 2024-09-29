const validator = require("validator");

const validateSignUpData = (req) => {
    const { firstName, lastName, emailId, password } = req.body;
    if(!firstName || !lastName){
        throw new Error("First name and Last name are required fields!");
    }
    else if(!validator.isEmail(emailId)){
        throw new Error("Invalid email ID!");
    }
    else if(!validator.isStrongPassword(password)){
        throw new Error("Please enter a strong password!");
    }
}


module.exports = {
    validateSignUpData,
}