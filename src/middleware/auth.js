const adminAuth = (req, res, next) => {
    console.log("Admin auth is getting checked!!");
    const token = "xyz";
    const isAdminAuthorised = token === "xyz";
    if (!isAdminAuthorised) {
      res.status(401).send("Unauthorised request");
    } else {
      next();
    }
  };


  const userAuth = (req, res, next) => {
    console.log("User Auth is getting checked!");
    const token = "abc";
    const isUserAuthorised = token === "abc";
    if(!isUserAuthorised){
        res.status(401).send("Unauthorised request");
    }else{
        next();
    } 
  }

  module.exports = {
    adminAuth, 
    userAuth, 
  }