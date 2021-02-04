var express = require("express");
var router = express.Router();
//const { data } = require("../public/data.js");

//importing middlware
const bodyParser = require("body-parser");
const cors = require("cors");
// importing required libraries
const bcrypt = require("bcryptjs"); // for encrypting password
const expressAsyncHandler = require("express-async-handler"); // to handle async mongodb function call

// importing user object made in model folder
const User = require("../models/userModels.js");
const generateToken = require("../utils/utils.js"); // function created to impliment jwswebtoken for securing data

/////////////////////////middleware//////////////////////////////////

//to handle post requests, dont know exactlyhow it works
//but it essentialy structures the incoming data for processing
router.use(express.json());
router.use(bodyParser.urlencoded({ extended: true }));
router.use(cors());

//////////////////////////* Insert New User Into Data Base. */////////////////////////////////////////
router.get(
  "/seed",
  expressAsyncHandler(async (req, res) => {
    //await User.remove({});
    const createdUsers = await User.insertMany(data.users);
    res.send({ createdUsers });
  })
);

//////////////////////////* ALlowing User Sign in. */////////////////////////////////////////
router.post(
  "/signin",
  expressAsyncHandler(async (req, res) => {
    const user = await User.findOne({ email: req.body.email });

    if (user) {
      if (bcrypt.compareSync(req.body.password, user.password)) {
        res.send({
          _id: user._id,
          name: user.name,
          email: user.email,
          isAdmin: user.isAdmin,
          token: generateToken(user), // creating a web token for securing web data, the above data will be encryted into a string
        });
        return;
      } else {
        res
          .status(401)
          .send({ message: "invalid email and password combination" });
      }
    }
    res.status(401).send({ message: "User doesn't exist" });
  })
);

module.exports = router;
