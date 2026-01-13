const mongoose = require("mongoose");

let isConnected = false;

async function connectDB() {
  if (isConnected) {
    console.log("🟡 MongoDB already connected");
    return;
  }

  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/AuthDB");
    isConnected = true;
    console.log("🟢 MongoDB connected successfully");
  } catch (error) {
    console.error("🔴 MongoDB connection failed:", error.message);
    process.exit(1);
  }
}

module.exports = connectDB;
