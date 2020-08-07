const mongoose = require('mongoose')
const dbUrl = 'mongodb://localhost:27017/polygon_app'

mongoose.connect(dbUrl, { 
    useNewUrlParser: true,
    useUnifiedTopology: true
})

const db = mongoose.connection

db.on('error', console.error.bind(console, 'db connection error'))

db.once('open', () => console.log('db connected'))

module.exports = mongoose