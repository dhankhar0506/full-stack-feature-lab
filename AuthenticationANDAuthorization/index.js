const express = require("express");
const connectDB = require("./DBConfig");
const authRoutes = require('./auth-Routes');
const homeRoutes = require('./home-routes');

const app = express();
const port = 8000;

app.use(express.json());
app.use('/api/auth', authRoutes)
app.use('/api/home', homeRoutes)

connectDB();

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(port, () => {
  console.log(`🚀 Server running on http://localhost:${port}`);
});
