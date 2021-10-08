const express = require("express");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const secret = process.env.JWT_SECRET;

const router = express.Router();

const User = require("../models/User");
const fetchUser = require("../middleware/fetchuser");

// ROUTE-1: Register a user using: POST "/api/auth/register". Doesn't Require Login
router.post('/register', [
    body('name', 'Enter a valid name').isLength({ min:3 }),
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Enter a strong password(equal or more than 8 characters)').isLength({ min:8 }),
], async (req, res)=> {
    let success = false;
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        success = false;
        return res.json({ success, errors: errors.array(), status: 400 })
    }
    try {
        let user = await User.findOne({email: req.body.email});
        if(user) {
            success = false;
            return res.json({success, error: "This email is associated to another account", status: 400})
        }
        const salt = await bcrypt.genSalt(10);
        const securePassword = await bcrypt.hash(req.body.password,salt);
        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: securePassword
        });
        const data = {
            user:{
                id: user.id
            }
        }
        const authToken = jwt.sign(data, secret);
        success = true;
        res.json({success, authToken, status: 200});
    }

    catch(err) {
        res.send({error: "Internal Server Error", status: 500});
    }

});

// ROUTE-2: Login a user using: POST "/api/auth/login". Doesn't Require Login
router.post('/login', [
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password cannot be empty').exists()
], async (req, res)=> {
    let success = false;
    const errors = validationResult(req.body);
    if(!errors.isEmpty()) {
        success = false;
        return res.json({success, error: errors.array()[0].msg, status: 400 })
    }

    const {email, password} = req.body;
    try {
        let user = await User.findOne({email});
        if(!user) {
            success = false;
            return res.json({success, error: "Please login with correct credentials", status: 400});
        }
        const passwordCompare = await bcrypt.compare(password, user.password);
        if(!passwordCompare) {
            success = false;
            return res.json({success, error: "Please login with correct credentials", status: 400});
        }
        const data = {
            user: {
                id: user.id
            }
        }
        const authToken = jwt.sign(data, secret);
        success = true;
        res.json({success, authToken, status: 200});

    } 
    catch(err) {
        res.send({error: "Internal Server Error", status: 500});
    }
})
// ROUTE-2: Get logged-in user details using: POST "/api/auth/profile". Require Login
router.post('/profile', fetchUser, async (req, res)=> {
    let success = false;
    try {
        const userId = req.user.id;
        const user = await User.findById(userId);
        success = true;
        res.send({success, user, status: 200});
    }
    catch(error) {
        success = false;
        res.send({success, error: "Internal Server Error", status: 500});
    }
})

module.exports = router;