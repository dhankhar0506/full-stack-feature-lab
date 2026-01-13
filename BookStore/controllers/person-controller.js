const Person = require('../models/person-model')


const addPerson = async (req, res) => {
    try {
        const newPerson = await Person.create(req.body)

        res.status(201).json({
            success: true,
            message: "Person added successfully",
            data: newPerson
        })
    } catch (error) {
        console.error(error)
        res.status(500).json({ success: false, message: "Failed to add person" })
    }
}


const getAllPersons = async (req, res) => {
    try {
        const persons = await Person.find()

        res.status(200).json({
            success: true,
            count: persons.length,
            data: persons
        })
    } catch (error) {
        console.error(error)
        res.status(500).json({ success: false, message: "Failed to fetch persons" })
    }
}

module.exports = { addPerson, getAllPersons }
