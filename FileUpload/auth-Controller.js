
const userModel = require('./Model')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


async function registerUser(req, res) {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({
                message: "All fields are required",
                status: false
            });
        }

        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                message: "User already exists",
                status: false
            });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = await userModel.create({
            name,
            email,
            password: hashedPassword
        });

        res.status(201).json({
            message: "User registered successfully",
            status: true,
            data: {
                id: newUser._id,
                name: newUser.name,
                email: newUser.email
            }
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Internal server error",
            status: false
        });
    }
}


async function loginUser(req, res) {
    try {
        const { email, password } = req.body;
        const checkuser = await userModel.findOne({ email });
        if (!checkuser) {
            return res.status(200).json({
                status: false,
                message: "User not found"
            });
        }
        console.log("checkuser", checkuser);
        const verifiedPassword = await bcrypt.compare(password, checkuser.password);
        if (!verifiedPassword) {
            return res.status(200).json({
                status: false,
                message: "Invalid credentials"
            });
        }

        const genrateToken = jwt.sign({
            id: checkuser._id,
            name: checkuser.name,
            email: checkuser.email
        }, process.env.JWT_SECRET, { expiresIn: '15min' });


        res.status(200).json({
            status: true,
            message: "Login Successful",
            genrateToken
        });

    } catch (error) {
        res.status(500).json({
            message: "Internal server error",
            status: false
        });
    }
}

module.exports = { registerUser, loginUser };