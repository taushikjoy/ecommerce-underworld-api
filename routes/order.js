const router = require("express").Router();
const bcrypt = require("bcrypt");
// const checkLogin = require("../middlewares/checkLogin");
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("../middlewares/verifyToken");

const Order = require("../models/Order");

//add new Order

router.post("/", verifyToken, async (req, res) => {
  const newOrder = new Order(req.body);
  try {
    const savedOrder = await newOrder.save();
    res.status(200).json(savedOrder);
  } catch (error) {
    res.status(404).send(error);
  }
});

//get Order
router.get("/find/:id", async (req, res) => {
  const order = await Order.findById(req.params.id);

  res.status(200).json(order);
});

//get all Orders
router.get("/", async (req, res) => {
  // const qNew = req.query.new;

  try {
    let orders = await Order.find();

    res.status(200).json(orders);
  } catch (error) {}
});

// //Delete Order
router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    await Order.findByIdAndDelete(req.params.id);
    res.status(200).json("Order has been deleted...");
  } catch (err) {
    res.status(500).json(err);
  }
});

// //Update Product
// router.patch("/:id", verifyTokenAndAdmin, async (req, res) => {
//   try {
//     const updatedProduct = await Product.findByIdAndUpdate(req.params.id, {
//       $set: req.body,
//     });
//     res.status(200).json(updatedProduct);
//   } catch (err) {
//     console.log(err);
//     res.status(500).json(err);
//   }
// });

module.exports = router;
