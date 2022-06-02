const router = require("express").Router();
const bcrypt = require("bcrypt");
// const checkLogin = require("../middlewares/checkLogin");
const Cart = require("../models/Cart");


const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("../middlewares/verifyToken");


//add new cart

router.post("/", verifyToken, async (req, res) => {
  const newCart = new Cart(req.body);
  try {
    const savedCart = await newCart.save();
    res.status(200).json(savedCart);
  } catch (error) {
    res.status(404).send(error);
  }
});

// //get Product
// router.get("/find/:id", async (req, res) => {
//   const product = await Product.findById(req.params.id);

//   res.status(200).json(product);
// });

//get all Products
router.get("/", async (req, res) => {
  // const qNew = req.query.new;

  try {
    let cart = await Cart.find();

    res.status(200).json(cart);
  } catch (error) {}
});

// //Delete Cart
router.delete("/:id", async (req, res) => {
  try {
    await Cart.findByIdAndDelete(req.params.id);
    res.status(200).json("Cart has been deleted...");
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
