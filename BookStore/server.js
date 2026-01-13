equire('dotenv').config()
const express = require("express")
const { connectDB, disConnectDB } = require('./database/db')
const bookRoutes = require('./routes/book-routes')
const personRoutes = require('./routes/person')
const passport = require('passport')
const passportSrategy = require('passport-local').Strategy






const app = express()
const port = process.env.PORT

// passport
app.use(passport.initialize())

// connect to db
connectDB()

// middleWare
app.use(express.json())

// routes
app.use('/api/books', bookRoutes)

app.use('/api/person', personRoutes)




app.listen(port, () => {
    console.log(`Server is Started in Port no: ${port}`);
})