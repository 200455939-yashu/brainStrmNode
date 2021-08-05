const express = require('express')
const dotenv = require('dotenv')
const cors = require('cors')
const mongoose = require('mongoose')
const app = express()
const authRoutes = require('./routes/auth')
const courseRoutes = require('./routes/course')


dotenv.config()

// Add connect to DB
mongoose.connect(
    process.env.MONGO_CONNECT,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    },
    () => console.log('connected to DB')
)

// Middleware
app.use(cors())
app.options('*', cors())
app.use(express.static(__dirname + 'public'))
app.use(express.json())

// Route Middlewares
app.use('/api/user', authRoutes)
app.use('/api/course', courseRoutes)

// Start server at port 3000
app.listen(8000, () => console.log('server up and running'))