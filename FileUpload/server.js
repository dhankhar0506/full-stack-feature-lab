const express = require('express');
require('dotenv').config();
const authRoutes = require('./auth-Routes');
const connectToDB = require('./Dbconfig');
const app = express();
const port = process.env.PORT || 8000;


app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/home', require('./home-routes'))

connectToDB()


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})