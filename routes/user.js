const router = require("express").Router();
const bcrypt = require("bcrypt");
// const checkLogin = require("../middlewares/checkLogin");
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("../middlewares/verifyToken");

const User = require("../models/User");

//get user
router.get("/find/:id", verifyTokenAndAdmin, async (req, res) => {
  const user = await User.findById(req.params.id);
  // const { password, ...others } = user;
  // res.status(200).json(others);

  res.status(200).json(user);
});

//Update user
router.patch("/:id", verifyTokenAndAuthorization, async (req, res) => {
  //const hashedpassword = await bcrypt.hash(req.body.password, 10);
  // if (req.body.password) {
  //   req.body.password = hashedpassword;
  // }
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, {
      username: "joyupdated",
    });
    res.status(200).json(updatedUser);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

//Delete User
router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json("user deleted");
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});
// router.get("/", verifyToken, (req, res) => {
//   res.json(req.user);
// });

module.exports = router;
