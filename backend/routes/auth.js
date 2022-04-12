const express = require("express");
const User = require("../models/User");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require("express-validator");
const router = express.Router();
const SEC_SIGN = "a6good$gir*l"

router.post(
  "/createUser",
  [
    body("email").isEmail(),
    body("password").isLength({ min: 5 }),
    body("name").isLength({ min: 3 }),
  ],
  async (req, res) => {
    //if there are erros, retur bad request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const user = await User.findOne({ email: req.body.email });
      if (user) {
        return res
          .status(400)
          .json({ error: "sorry an user with this email already exists" });
      }
      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(req.body.password, salt)

      user = await User.create({
        name: req.body.name,
        password: secPass,
        email: req.body.email,
      });
      const data = {
        user:{
          id: user.id
        }
      }
      const authToken = jwt.sign(data, SEC_SIGN);
      res.json({authToken});
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error")
    }
  }
);

router.post(
  "/login",
  [
    body("email", "Enter a valid Email").isEmail(),
    body("password", "Password must not be empty").exists(),
  ],
  async (req, res) => {
    //if there are erros, retur bad request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const {email, password} = req.body;
      const user = await User.findOne({email});
      if (!user) {
        return res
          .status(400)
          .json({ error: "Please try to login with valid credentials" });
      }
      const passCompare = await bcrypt.compare(password, user.password);
      if (!passCompare) {
        return res
          .status(400)
          .json({ error: "Please try to login with valid credentials" });
      }

      const data = {
        user:{
          id: user.id
        }
      }
      const authToken = jwt.sign(data, SEC_SIGN);
      res.json({authToken});
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error")
    }
  }
);

module.exports = router;
