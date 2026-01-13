const express = require('express')
const { getAllBooks, getSingleBookbyId, addNewBook, updateBook, deleteBook } = require('../controllers/book-controller')

const router = express.Router()


router.get('/get', getAllBooks)
router.get('/get/:id', getSingleBookbyId)
router.post('/add', addNewBook)
router.put('/update/:id', updateBook)
router.delete('/delete/:id', deleteBook)


module.exports = router