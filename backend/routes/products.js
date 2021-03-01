var express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
var router = express.Router();
const expressAsyncHandler = require("express-async-handler");

const { data } = require("../public/data.js");
const { isAuth } = require("../utils/utils");
const { isAdmin } = require("../utils/utils");
const Product = require("../models/productModels.js");

//middleware
//to handle post requests, dont know exactlyhow it works
//but it essentialy structures the incoming data for processing
router.use(express.json());
router.use(bodyParser.urlencoded({ extended: true }));
router.use(cors());

/* GET users listing. 

router.get("/api", (req, res) => {
  res.send(data.products);
});

// getting data of a specific product from the static data file stored in backend
router.get("/api/:id", (req, res) => {
  const product = data.products.find((x) => x.id === req.params.id);
  if (product) {
    res.send(product);
  } else {
    res.status(404).send({ message: "product not found" });
  }
});
*/

// inserting product into Mogodb db
router.get(
  "/seed",
  expressAsyncHandler(async (req, res) => {
    //await Product.remove({});
    const createdProducts = await Product.insertMany(data.products);
    res.send({ createdProducts });
  })
);

// getting all products
router.get(
  "/",
  expressAsyncHandler(async (req, res) => {
    const products = await Product.find({});
    res.send(products);
  })
);

// geting specific product by id
router.get(
  "/:id",
  expressAsyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (product) {
      res.send(product);
    } else {
      res.status(404).send({ message: "Product Not Found" });
    }
  })
);

// geting specific product by id
router.post(
  "/createProduct",
  isAdmin,
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const product = new Product({
      title: "sample name " + Date.now(),
      image: "/images/p1.jpg",
      price: 0,
      category: "sample category",
      brand: "sample brand",
      countInStock: 0,
      rating: 0,
      numReviews: 0,
      description: "sample description",
    });
    const createdProduct = await product.save();
    res.send({ message: "Product Created", product: createdProduct });
  })
);

module.exports = router;
