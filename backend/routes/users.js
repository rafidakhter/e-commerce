var express = require("express");
const { data } = require("../public/data.js");
const User = require("../models/userModels.js");
const expressAsyncHandler = require("express-async-handler");
var bcrypt = require("bcryptjs");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = require("../app");
var router = express.Router();

/////////////////////////middleware//////////////////////////////////
//to handle post requests, dont know exactlyhow it works
//but it essentialy structures the incoming data for processing
router.use(express.json());
router.use(bodyParser.urlencoded({ extended: true }));
router.use(cors());

//////////////////////////* Insert. */////////////////////////////////////////
router.get(
  "/seed",
  expressAsyncHandler(async (req, res) => {
    //await User.remove({});
    const createdUsers = await User.insertMany(data.users);
    res.send({ createdUsers });
  })
);

module.exports = router;
