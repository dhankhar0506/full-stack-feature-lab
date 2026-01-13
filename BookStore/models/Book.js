const mongoose = require('mongoose')


const BookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Book Title is required'],
        trim: true,
        maxLength: [100, "Book title can not be more than 100 characters"]
    },
    author: {
        type: String,
        required: [true, 'Author name is required'],
        trim: true,
    },
    year: {
        type: Number,
        required: [true, 'Publication year is required']
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
})

module.exports = mongoose.model('Book', BookSchema)