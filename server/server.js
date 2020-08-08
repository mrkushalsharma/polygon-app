const PORT = 5000

const express = require('express')

const mongoose = require('./dbConnection')

const app = express()
const apiRoutes = require('./api')

app.use('/api', apiRoutes)

app.listen(PORT, () => console.log(`Express server running on port ${PORT}`))
