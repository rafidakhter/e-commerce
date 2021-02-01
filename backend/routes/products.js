var express = require("express");
const { data } = require("../public/data.js");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = require("../app");
var router = express.Router();

//middleware
//to handle post requests, dont know exactlyhow it works
//but it essentialy structures the incoming data for processing
router.use(express.json());
router.use(bodyParser.urlencoded({ extended: true }));
router.use(cors());

/* GET users listing. */

router.get("/api", (req, res) => {
  res.send(data.products);
});

router.get("/api/:id", (req, res) => {
  const product = data.products.find((x) => x.id === req.params.id);
  if (product) {
    res.send(product);
  } else {
    res.status(404).send({ message: "product not found" });
  }
});

module.exports = router;
