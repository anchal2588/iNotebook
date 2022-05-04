const express = require("express");
const User = require("../models/User");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchUser');
const { body, validationResult } = require("express-validator");
const router = express.Router();
const SEC_SIGN = "a6good$gir*l"


//create a new user
router.post(
  "/createUser",
  [
    body("email").isEmail(),
    body("password").isLength({ min: 5 }),
    body("name").isLength({ min: 3 }),
  ],
  async (req, res) => {
    //if there are erros, retur bad request
    let status = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ status, errors: errors.array() });
    }
    try {
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res
          .status(400)
          .json({ status, error: "sorry an user with this email already exists" });
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
      status =  true;     
      res.json({status, authToken});
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error")
    }
  }
);

//authenticate user

router.post(
  "/login",
  [
    body("email", "Enter a valid Email").isEmail(),
    body("password", "Password must not be empty").exists(),
  ],
  async (req, res) => {
    let status = false;
    //if there are erros, retur bad request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ status, errors: errors.array() });
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
          .json({ status, error: "Please try to login with valid credentials" });
      }

      const data = {
        user:{
          id: user.id
        }
      }
      const authToken = jwt.sign(data, SEC_SIGN);
      status = true;
      res.json({status, authToken});
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error")
    }
  }
);

//get user details 
router.post(
  "/getUser",
  fetchuser,
  async (req, res) => {
    try {
      const userId = req.user.id;
      const user = await User.findById(userId).select("-password")
      res.send(user);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error")
    }
  }
);

module.exports = router;
