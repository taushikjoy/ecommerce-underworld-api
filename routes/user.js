const router = require("express").Router();
const bcrypt = require("bcrypt");
// const checkLogin = require("../middlewares/checkLogin");
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("../middlewares/verifyToken");

const User = require("../models/User");

//get all user
router.get("/", verifyTokenAndAdmin, async (req, res) => {
  const query = req.query.new;

  try {
    const user = query
      ? await User.find().sort({ _id: -1 }).limit(2)
      : await User.find();

    res.status(200).json(user);
  } catch (error) {
    res.status(404).json(error);
  }

  // const { password, ...others } = user;
  // res.status(200).json(others);
});

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
      $set: req.body,
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

//GET USER STATS

router.get("/stats", verifyTokenAndAdmin, async (req, res) => {
  const date = new Date();
  const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));

  try {
    const data = await User.aggregate([
      { $match: { createdAt: { $gte: lastYear } } },
      {
        $project: {
          month: { $month: "$createdAt" },
        },
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: 1 },
        },
      },
    ]);
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json(err);
  }
});
// router.get("/", verifyToken, (req, res) => {
//   res.json(req.user);
// });

module.exports = router;
