// MONGO DB + Express (Dummy Data)
const express = require('express')
const mongoose = require('mongoose')
const app = express()
const port = 8080
app.use(express.json())




mongoose.connect("mongodb://127.0.0.1:27017/Basics")
    .then(() => console.log("✅ MongoDB Connected"))
    .catch(err => console.log("❌ Mongo Error:", err))


const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    age: Number,
    isActive: Boolean,
    tags: [String]
})


const UserModel = mongoose.model("User", userSchema)


async function InsertQuery() {
    try {

        const user = await UserModel.create({
            name: "ABC",
            email: "abc@gmail.com",
            age: 22,
            isActive: true,
            tags: ["NodeJS", "MongoDB"]
        })

        console.log("Inserted One:", user)

        await UserModel.insertMany([
            { name: "DEF", email: "def@gmail.com", age: 25, isActive: true, tags: ["React"] },
            { name: "GHI", email: "ghi@gmail.com", age: 30, isActive: false, tags: ["Express"] },
            { name: "JKL", email: "jkl@gmail.com", age: 28, isActive: true, tags: ["NodeJS"] }
        ])

        console.log("Inserted Many")


    } catch (err) {
        console.log("Error:", err)
    } finally {
        await mongoose.connection.close()
        console.log("🔌 Connection closed")
    }
}

// InsertQuery()



// Find
// async function findQuery() {
//     try {
//         // const getall = await UserModel.find()
//         // const getone = await UserModel.findOne({ name: 'JKL'})
//         // const getonebyID = await UserModel.findById('694b9bff14e22c3ccd57654f')
//         // const conditonFind = await UserModel.find({ age: { $gte: 30 } })
//         console.log("DATA:", conditonFind)
//     } catch (error) {
//         console.log("Error:", error)
//     } finally {
//         await mongoose.connection.close()
//         console.log("🔌 Connection closed")
//     }
// }

// findQuery()


// UPDATE
// async function Update() {
//     try {
//         const update = await UserModel.updateOne({ name: "DEF" }, { isActive: false, email: "yoyo.gmail.com" })
//         console.log("Update", update);

//     } catch (err) {
//         console.log(err);

//     } finally {
//         await mongoose.connection.close()
//     }
// }

// Update()





// Delete
async function DeleteField() {
    try {
        const deleteData = await UserModel.findByIdAndDelete("694b9bff14e22c3ccd576552")
        console.log("Delete", deleteData);
    } catch (err) {
        console.log(err);
    } finally {
        await mongoose.connection.close()
    }
}
DeleteField()

// const books = [
//     {
//         id: 1,
//         title: "Clean Code",
//         author: "Robert C. Martin",
//     },
//     {
//         id: 2,
//         title: "The Pragmatic Programmer",
//         author: "Andrew Hunt",
//     },
//     {
//         id: 3,
//         title: "The  Programmer",
//         author: " Hunt",

//     },
//     {
//         id: 4,
//         title: "The Hunter",
//         author: " Alein",

//     }
// ]

// app.get('/', (req, res) => {
//     res.json({ message: 'Welcome to Book Store' })
// })

// // Get All Books
// app.get('/get', (req, res) => {
//     res.status(200).json({ data: books })
// })

// // Get Book By ID
// app.get('/get/:id', (req, res) => {
//     const id = Number(req.params.id)

//     const bookData = books.find(item => item.id === id)

//     if (!bookData) {
//         return res.status(404).json({
//             message: "Invalid Book ID"
//         })
//     }

//     res.status(200).json({
//         data: bookData
//     })
// })


// // Post API
// app.post('/add', (req, resp) => {
//     const newData = req.body
//     const exists = books.some(item => item.id === newData.id)
//     console.log("exists", exists);

//     if (exists) {
//         return resp.status(409).json({
//             message: "Sorry, Book already exists"
//         })
//     }
//     books.push(newData)

//     resp.status(201).json({
//         message: "Book added successfully",
//         data: books
//     })
// })

// // Put Api
// app.put('/update/:id', (req, resp) => {
//     const id = Number(req.params.id)
//     const updatedData = req.body

//     const index = books.findIndex(item => item.id === id)
//     if (index === -1) {
//         return resp.status(404).json({
//             message: "Book not found"
//         })
//     }
//     console.log("index", index);
//     console.log(" books[index]", books[index]);


//     books[index] = {
//         ...books[index],
//         ...updatedData,
//         id
//     }

//     resp.status(200).json({
//         message: "Book updated successfully",
//         data: books[index],
//         finalData: books
//     })
// })

// app.delete('/delete/:id', (req, resp) => {
//     const deleteID = Number(req.params.id)

//     const index = books.findIndex(item => item.id === deleteID)

//     if (index === -1) {
//         return resp.status(404).json({
//             message: "Book not found"
//         })
//     }

//     const deletedBook = books.splice(index, 1)
//     console.log("--", deletedBook);


//     resp.status(200).json({
//         message: "Book deleted successfully",
//         data: deletedBook[0]
//     })
// })

app.listen(port, () => {
    console.log(`Server started on port ${port}`)
})
