const mongoose = require('mongoose')

async function connectDB() {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/BookStore')
        console.log('✅ MongoDB Connected')
    } catch (error) {
        console.error('❌ MongoDB Connection Failed:', error.message)
        process.exit(1)
    }
}

async function disConnectDB() {
    try {
        await mongoose.connection.close()
        console.log('✅ MongoDB Disconnected Successfully')
    } catch (error) {
        console.error('❌ MongoDB Disconnection Failed:', error.message)
        process.exit(1)
    }
}

module.exports = { connectDB, disConnectDB }
