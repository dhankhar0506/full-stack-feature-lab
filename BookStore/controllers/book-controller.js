
const bookModel = require('../models/Book')

const getAllBooks = async (req, res) => {
    try {
        const books = await bookModel.find()

        return res.status(200).json({
            message: 'Data fetched successfully',
            count: books.length,
            data: books
        })

    } catch (error) {
        console.error("Unable to fetch data:", error)

        return res.status(500).json({
            message: 'Unable to fetch data',
            success: false
        })
    }
}



const getSingleBookbyId = async (req, res) => {
    try {
        const { id } = req.params

        const book = await bookModel.findById(id)

        if (!book) {
            return res.status(404).json({
                message: "Book not found",
                success: false
            })
        }

        return res.status(200).json({
            success: true,
            data: book
        })

    } catch (error) {
        console.error("Unable to fetch data:", error)

        return res.status(500).json({
            message: 'Unable to fetch data',
            success: false
        })
    }
}



const addNewBook = async (req, res) => {
    try {
        let bookData = req.body``
        if (!Array.isArray(bookData)) {
            bookData = [bookData]
        }

        const createdBooks = await bookModel.insertMany(bookData)

        return res.status(201).json({
            message: "Book(s) added successfully",
            success: true,
            count: createdBooks.length,
            data: createdBooks
        })

    } catch (error) {
        console.error("Unable to save data:", error)

        return res.status(500).json({
            message: "Unable to save book",
            success: false,
            error: error.message
        })
    }
}



const updateBook = async (req, res) => {
    try {
        const { id } = req.params
        const updatedData = req.body

        const updatedBook = await bookModel.findByIdAndUpdate(
            id,
            updatedData,
            { new: true, runValidators: true }
        )


        if (!updatedBook) {
            return res.status(404).json({
                message: "Book not found",
                success: false
            })
        }

        return res.status(200).json({
            message: "Book updated successfully",
            success: true,
            data: updatedBook
        })

    } catch (error) {
        console.error("Update failed:", error)

        return res.status(500).json({
            message: "Unable to update book",
            success: false
        })
    }
}




const deleteBook = async (req, res) => {
    try {
        const { id } = req.params

        const deletedBook = await bookModel.findByIdAndDelete(id)

        if (!deletedBook) {
            return res.status(404).json({
                message: "Book not found",
                success: false
            })
        }

        return res.status(200).json({
            message: "Book deleted successfully",
            success: true,
            data: deletedBook
        })

    } catch (error) {
        console.error("Delete failed:", error)

        return res.status(500).json({
            message: "Unable to delete book",
            success: false
        })
    }
}


module.exports = { getAllBooks, getSingleBookbyId, addNewBook, updateBook, deleteBook }
