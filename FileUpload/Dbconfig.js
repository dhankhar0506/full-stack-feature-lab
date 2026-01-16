const mongoose = require("mongoose")

let isConnected = false;

async function connectToDB() {
    if (isConnected) {
        console.log("Already connected to database");
        return;
    }
    try {
        await mongoose.connect("mongodb://127.0.0.1:27017/FileUpload")
        isConnected = true;
        console.log("✅ Connected to database successfully");
    } catch (error) {
        console.log("❌ Error connecting to database:", error);
        process.exit(1);
    }
}

module.exports = connectToDB