const jwt = require("jsonwebtoken");

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

module.exports = generateToken;
