// Register Controller
const bcrypt = require('bcryptjs');
const User = require('./Model');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv').config()


// Register Controller
const registerUser = async (req, res) => {
    try {
        const { username, email, password, role } = req.body;

        const checkExistingUser = await User.findOne({
            $or: [{ email }, { username }]
        });

        if (checkExistingUser) {
            return res.status(400).json({
                status: false,
                message: "User already exists"
            });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            username,
            email,
            password: hashedPassword,
            role
        });

        await newUser.save();
        if (newUser) {
            res.status(201).json({
                status: true,
                message: "User registered successfully"
            });
        } else {
            res.status(400).json({
                status: false,
                message: "User registration failed"
            });
        }

    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: false,
            message: "Server Error"
        });
    }
};


// Login Controller
const loginUser = async (req, res) => {
    try {
        const { username, password } = req.body;
        const checkUser = await User.findOne({ username });
        console.log("checkUser", checkUser);

        if (!checkUser) {
            return res.status(200).json({
                status: false,
                message: "User not found"
            });
        }

        const isMatch = await bcrypt.compare(password, checkUser.password);
        if (!isMatch) {
            return res.status(200).json({
                status: false,
                message: "Invalid Credentials"
            });
        }
        const accessToken = jwt.sign({
            userId: checkUser._id,
            username: checkUser.username,
            role: checkUser.role
        }, process.env.JWT_SECRET_KEY, { expiresIn: '15m' })
        res.status(200).json({
            status: true,
            message: "Login Successful",
            accessToken
        });
    } catch (error) {
        res.status(500).json({
            status: false,
            message: "Server Error"
        });
    }

}

module.exports = { registerUser, loginUser };