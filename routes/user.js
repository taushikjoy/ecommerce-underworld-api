const router = require("express").Router();
const bcrypt = require("bcrypt");
// const checkLogin = require("../middlewares/checkLogin");
const {
  verifyToken,
  verifyTokenAndAuthorization,
} = require("../middlewares/verifyToken");

const User = require("../models/User");

router.get("/:username", async (req, res) => {
  const user = await User.find({ username: req.params.username });

  res.status(200).json(user);
});

router.put("/:id", verifyTokenAndAuthorization, async (req, res) => {
  //const hashedpassword = await bcrypt.hash(req.body.password, 10);
  // if (req.body.password) {
  //   req.body.password = hashedpassword;
  // }
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedUser);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});
// router.get("/", verifyToken, (req, res) => {
//   res.json(req.user);
// });

module.exports = router;
