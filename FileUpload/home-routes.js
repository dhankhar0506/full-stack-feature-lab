const express = require('express');
const router = express.Router();
const authMiddleware = require('./auth-middleware');




router.get('/welcome', authMiddleware, (req, res) => {
    res.status(200).json({
        message: "Welcome to the Home Route",
        requestedBy: req.userInfo
    });
});

module.exports = router;