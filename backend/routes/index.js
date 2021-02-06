var express = require("express");
var router = express.Router();

var express = require("express");
var router = express.Router();

//importing middlware
const bodyParser = require("body-parser");
const cors = require("cors");

/////////////////////////middleware//////////////////////////////////

//to handle post requests, dont know exactlyhow it works
//but it essentialy structures the incoming data for processing
router.use(express.json());
router.use(bodyParser.urlencoded({ extended: true }));
router.use(cors());

module.exports = router;
