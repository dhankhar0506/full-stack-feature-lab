const express = require('express')
const { addPerson, getAllPersons } = require('../controllers/person-controller')

const router = express.Router()


router.post('/add', addPerson)

router.get('/', getAllPersons)

module.exports = router
