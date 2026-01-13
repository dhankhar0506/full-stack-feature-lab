const { default: mongoose } = require("mongoose");

// Schema
const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    age: Number,
    isActive: Boolean,
    tags: [String]
})


// Model
const User = mongoose.model('User', userSchema)




