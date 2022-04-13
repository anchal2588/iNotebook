const jwt = require("jsonwebtoken");
const SEC_SIGN = "a6good$gir*l";

const fetchUser = (req, res, next) => {
  const token = req.header("auth-token");
  if (!token) {
    res.status(401).send({ error: "please authenticate with valid token" });
  }
  try {
    const data = jwt.verify(token, SEC_SIGN);
    req.user = data.user;
    next();
  } catch (error) {
    res.status(401).send({ error: "please authenticate with valid token" });
  }
};

module.exports = fetchUser;
