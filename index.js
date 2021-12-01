require('./src/models/User')
const express = require('express')
const dotenv = require('dotenv')
const mongoose = require("mongoose");
const bodyParser = require('body-parser')
const authRequire = require('./src/middleware/authRequire')
const fetchRoutes = require('./src/routes/fetchRoutes')
const authRoutes = require('./src/routes/authRoutes')
const app = express()

dotenv.config()

app.use(bodyParser.json())
app.use(authRoutes)
app.use(fetchRoutes)

const PORT = 2230

const mongoURI = process.env.MONGO_URI

mongoose.connect(mongoURI)
mongoose.connection.on('connected', () => {
    console.log("Connected to mongoose")
})
mongoose.connection.on('error', err => {
    console.log(`Error connecting to mongoose. MSG ${err}`)
})

app.get('/', authRequire, (req, res) => {
    res.send(`Your email is ${req.user.email}`)
})

app.listen(PORT, () => {
    console.log(`Running on port: ${PORT}`)
})
