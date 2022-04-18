const jwt = require("jsonwebtoken");

const checkLogin = (req, res, next) => {
  const { authorization } = req.headers;
  console.log(req.headers);

  try {
    const token = authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SEC);
    const { username, userId } = decoded;
    req.username = username;
    req.userId = userId;

    next();
  } catch {
    next("EROR");
  }
  //   console.log(req.headers);
};

module.exports = checkLogin;
