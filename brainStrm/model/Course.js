const mongoose = require('mongoose')

const courseSchema = new mongoose.Schema({
    coursename: {
        type: String,
        required: true
    },
    courseimg: {
        type: String,
        required: true
    },
    coursedesc: {
        type: String,
        required: true
    },
    courseVideo1Title: {
        type: String,
        required: true
    },
    courseVideo2Title: {
        type: String,
        required: true
    },
    courseVideo1Video: {
        type: String,
        required: true
    },
    courseVideo2Video: {
        type: String,
        required: true
    },
    user: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Course', courseSchema)