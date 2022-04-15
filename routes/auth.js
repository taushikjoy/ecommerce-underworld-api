const router = require("express").Router();

const bcrypt = require("bcrypt");

const User = require("../models/User");
//const CryptoJS = require("crypto-js");

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
      res.send("password matched");
    } else {
      res.send("not matched");
    }
  } else {
    res.send("not found");
  }
});

// router.post("/login", async (req, res) => {
//   try {
//     const user = await User.findOne({ username: req.body.username });

//     const hashedpassword = CryptoJS.AES.decrypt(
//       user.password,
//       process.env.PASS_SEC
//     );
//   } catch (error) {
//     res.json(error);
//   }
// });

module.exports = router;

// CryptoJS.AES.encrypt(
//   req.body.password,
//   process.env.PASS_SEC
// ).toString(),
