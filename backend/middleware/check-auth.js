const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    jwt.verify(token, "MisionTic2021_secret_for_Blogify");
    next();
  } catch (err) {
    res.status(401).json({ message: "Autenticación fallida" });
  }
};
