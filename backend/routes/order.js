var express = require("express");
var router = express.Router();
//const { data } = require("../public/data.js");

//importing middlware
const bodyParser = require("body-parser");
const cors = require("cors");
// importing required libraries
const expressAsyncHandler = require("express-async-handler"); // to handle async mongodb function call

// importing user object made in model folder
const Order = require("../models/orderModel");
const { isAuth } = require("../utils/utils");

/////////////////////////middleware//////////////////////////////////

//to handle post requests, dont know exactlyhow it works
//but it essentialy structures the incoming data for processing
router.use(express.json());
router.use(bodyParser.urlencoded({ extended: true }));
router.use(cors());
//////////////////////////* Insert Order into MongoDB */////////////////////////////////////////
router.post(
  "/",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    if (req.body.orderItems.length === 0) {
      res.status(400).send({ message: "Cart is empty" });
    } else {
      const order = new Order({
        orderItems: req.body.orderItems,
        shippingAddress: req.body.shippingAddress,
        paymentMethod: req.body.paymentMethod,
        itemsPrice: req.body.itemsPrice,
        shippingPrice: req.body.shippingPrice,
        taxPrice: req.body.taxPrice,
        totalPrice: req.body.totalPrice,
        user: req.user._id,
      });
      const createdOrder = await order.save();
      res
        .status(201)
        .send({ message: "New Order Created", order: createdOrder });
    }
  })
);

router.get(
  "/:id",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);
    if (order) {
      res.status(200).send({ order });
      console.log("order sent");
    } else {
      console.log("get error");
      res.status(404).send({ message: "Order Not found" });
    }
  })
);

router.get("/config/paypal", function (req, res) {
  console.log("config sent");
  res.send(process.env.PAYPAL_CLIENT_ID);
});
module.exports = router;
