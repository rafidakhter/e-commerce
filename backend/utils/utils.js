const jwt = require("jsonwebtoken");

// generate token for user when logged in and used for authenticaion
const generateToken = (user) => {
  console.log("generate token");
  return jwt.sign(
    {
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    },
    process.env.JWT_SECRET || "secretmessage", // this is a key to secure data
    {
      expiresIn: "1d", // expiry of the token
    }
  );
};

//used to authenticate/grant permission to page
const isAuth = (req, res, next) => {
  const authorization = req.headers.authorization;
  if (authorization) {
    const token = authorization.slice(7, authorization.length);
    jwt.verify(
      token,
      process.env.JWT_SECRET || "somethingsecret",
      (err, decode) => {
        if (err) {
          res.status(401).send({ message: "Invalid Token" });
        } else {
          req.user = decode;
          next();
        }
      }
    );
  } else {
    res.status(401).send({ message: "No Token" });
  }
};

// used to authenticate admin page
const isAdmin = (req, res, next) => {
  const user = req.body.user;
  if (user && user.isAdmin) {
    next();
  } else {
    res.status(401).send({ message: "user not admin" });
  }
};

module.exports = { generateToken, isAuth, isAdmin };
