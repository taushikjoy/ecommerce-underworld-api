const router = require("express").Router();

router.get("/", (req, res) => {
  res.send("successfull");
});

module.exports = router;
