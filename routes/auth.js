const router = require("express").Router();

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

//register

router.post("/register", async (req, res) => {
  const hashedpassword = await bcrypt.hash(req.body.password, 10);
  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    password: hashedpassword,
  });

  try {
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (error) {
    res.json(error);
  }
});

//LOGIN

router.post("/login", async (req, res) => {
  const user = await User.find({ username: req.body.username });

  if (user && user.length > 0) {
    const isVallid = await bcrypt.compare(req.body.password, user[0].password);
    if (isVallid) {
      const token = jwt.sign(
        {
          username: user[0].username,
          userId: user[0]._id,
          isAdmin: user[0].isAdmin,
        },
        process.env.JWT_SEC,
        {
          expiresIn: "3d",
        }
      );
      const { password, ...others } = user._doc;

      res.status(200).json({
        accesstoken: token,
        user: user[0],
        // user: user[0],
      });
    } else {
      res.send("not matched");
    }
  } else {
    res.send("not found");
  }
});

module.exports = router;
