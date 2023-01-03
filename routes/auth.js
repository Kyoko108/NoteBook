const express = require('express');
const router = express.Router();
const User = require('../models/User')
const { body, validationResult } = require('express-validator');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
let fetchuser = require('../middleware/fetchuser')

const secret = "H@ppiness starts with y0u"

// Create a user using POST '/api/routes'. Dosen't require login
router.post('/createuser', [ 
        body('email', 'Enter a valid Email').isEmail(),
        body('name', 'Enter a valid name').isLength({ min: 3 }),
        body('password', 'Password must be atleast of 5 characters').isLength({ min: 5 })
    ],
    async (req, res) => {
        let success=false;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        try {
            // check whether user with this email already exist
            let user = await User.findOne({ email: req.body.email })
            if (user) {
                return res.status(400).json({success, error: "A user with this email already exist" })
            }
            var salt = bcrypt.genSaltSync(10);
            const secPass = bcrypt.hashSync(req.body.password, salt);

            user = await User.create({
                email: req.body.email,
                name: req.body.name,
                password: secPass,
            })
            const data = {
                user: {
                    id: user.id
                }
            }
            var authtoken = jwt.sign(data, secret);
            success=true;
            res.send({success, authtoken })
        } catch (error) {
            console.log(error.message);
            res.status(500).send("Internal server error has occured")
        }
    })


//Login a user using credentials
router.post('/login', [
    body('email', 'Enter a valid Email').isEmail(),
    body('password', 'Password cannot be blank').exists()
], async (req, res) => {
    let success=false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    try {
        // check whether user with this email  exist
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({success, error: "Please login using correct credentials" })
        };
        let passwordCompare = await bcrypt.compare(password, user.password);
        if (!passwordCompare) {
            return res.status(400).json({success, error: "Please login using correct credentials" })
        };
        const data = {
            user: {
                id: user.id
            }
        }
        var authtoken = jwt.sign(data, secret);
        success=true;
        res.json({success, authtoken })
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal server error has occured")
    }
})

//get user details
router.post('/getuser', fetchuser, async (req, res) => {
    
    try {
        const userID= req.user.id;
        // check whether user with this email  exist
         let user = await User.findOne({userID}).select("-password");
        res.send(user)
        } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal server error has occured")
    }
})

module.exports = router;
