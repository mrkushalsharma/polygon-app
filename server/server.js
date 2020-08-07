const PORT = 5000
const bodyParser = require('body-parser')

const cors = require('cors')

const express = require('express')

const mongoose = require('./dbConnection')

const Polygon = require('./models/Polygon')

const app = express()
const apiRoutes = require('./api')

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use('/api', apiRoutes)

app.listen(PORT, () => console.log(`Express server running on port ${PORT}`))
