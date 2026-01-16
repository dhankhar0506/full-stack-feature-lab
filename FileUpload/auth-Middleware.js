const jwt = require('jsonwebtoken');

function authMiddleware(req, res, next) {
    try {
        const authHeader = req.headers['authorization'];

        const token = authHeader && authHeader.split(' ')[1];
        if (!token) {
            return res.status(401).json({
                message: "Access Denied: No Token Provided",
                status: false
            })
        }
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.userInfo = verified
        next()
    } catch (error) {
        return res.status(401).json({
            message: "Unauthorized access",
            status: false
        });
    }


}

module.exports = authMiddleware;
