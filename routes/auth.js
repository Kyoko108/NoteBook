const express = require("express");
const router = express.Router();// to create routes
const User = require("../models/User"); // import user schema from database
const { body, validationResult } = require("express-validator"); // used in body of request
var bcrypt = require("bcryptjs"); 
var jwt = require("jsonwebtoken");

const dotenv = require('dotenv');
dotenv.config(); 
let fetchuser = require("../middleware/fetchuser");

const secret = process.env.SECRET_KEY;

// Create a user using POST '/api/routes'. Dosen't require login
// Post means we create or update database
router.post(
  "/createuser",
  [
    body("email", "Enter a valid Email").isEmail(),
    body("name", "Enter a valid name").isLength({ min: 3 }),
    body("password", "Password must be atleast of 5 characters").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    let success = false;

    // if there are errors in request, return bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      // check whether user with this email already exist in user schema
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res
          .status(400)
          .json({ success, error: "A user with this email already exist" });
      }
      // use of bcrypt to encrypt password
      var salt = bcrypt.genSaltSync(10); // it creates a salt of 10 characters
      const secPass = bcrypt.hashSync(req.body.password, salt); // it adds salt to password and then encrypts it
      // user schema
      user = await User.create({
        email: req.body.email,
        name: req.body.name,
        password: secPass,
      });

      // use of jwt token to provide secure communication between client and server
      // it generate a token which has 3 parts
      // 1. algorthims and type of token
      // 2. payload which is data
      // 3. secret key

      const data = {
        user: {
          id: user.id,
        },
      };

      var authtoken = jwt.sign(data, secret);
      success = true;
      res.send({ success, authtoken ,name:req.body.name });
      //end of jwt use
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Internal server error has occured");
    }
  }
);

//Login a user using credentials
// here we use post because we are sending data to server
router.post(
  "/login",
  [
    body("email", "Enter a valid Email").isEmail(),
    body("password", "Password cannot be blank").exists(),
  ],
  async (req, res) => {
    // if there are errors in request, return bad request and the errors
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    //
    const { email, password } = req.body;
    try {
      // check whether user with this email  exist
      let user = await User.findOne({ email });
      if (!user) {
        return res
          .status(400)
          .json({ success, error: "Please login using correct credentials" });
      }
      console.log(user)
      // use of bcrypt to compare password it return true or false
      let passwordCompare = await bcrypt.compare(password, user.password);
      if (!passwordCompare) {
        return res
          .status(400)
          .json({ success, error: "Please login using correct credentials" });
      }
      // use of jwt token to provide secure communication between client and server
      const data = {
        user: {
          id: user.id,
        },
      };
      var authtoken = jwt.sign(data, secret);
      success = true;
      res.json({ success, authtoken ,name:user.name});
      //end of jwt use
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Internal server error has occured");
    }
  }
);

// get user details
// it first call the middleware fetchuser which check whether user is valid or not
// fetchuser takes the auth-token from request header and then verify it using jwt
//then call the next function
router.post("/getuser", fetchuser, async (req, res) => {
  try {
    const userID = req.user.id;
    // check whether user with this email  exist
    let user = await User.findOne({ userID }).select("-password");
    res.send(user);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Internal server error has occured");
  }
});

module.exports = router;
