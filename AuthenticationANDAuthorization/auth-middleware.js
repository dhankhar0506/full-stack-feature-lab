const jwt = require('jsonwebtoken');
const authMiddleware = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) {
        res.status(401).json({
            status: false,
            message: "Access Denied. No token provided"
        })
    }
    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET_KEY);
        console.log(verified);
        req.userInfo = verified;
        next();
    } catch (error) {
        res.status(400).json({
            status: false,
            message: "Invalid Token"
        });
    }
}


module.exports = authMiddleware;