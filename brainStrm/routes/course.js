const verify = require('./verifyToken')
const Course = require('../model/Course')
const router = require('express').Router()

router.post('/create', verify, async (req, res) => {
    // Create a new user
    const course = new Course({
        coursename: req.body.coursename,
        courseimg: req.body.courseimg,
        coursedesc: req.body.coursedesc,
        courseVideo1Title: req.body.courseVideo1Title,
        courseVideo2Title: req.body.courseVideo2Title,
        courseVideo1Video: req.body.courseVideo1Video,
        courseVideo2Video: req.body.courseVideo2Video,
        user: req.body.user
    })
    try {
        const savedCourse = await course.save()
        res.send({ course: course._id })
    } catch (err) {
        res.status(400).send(err)
    }
})

router.get('/mycourse/:id', verify, (req, res) => {
    try {
        Course.find({user: req.params.id}, (err, courses) => {
            var courseMap = {}
            courses.forEach(function(course) {
              courseMap[course._id] = course
            })
            res.json(courseMap)
        })
    } catch (err) {
        res.status(400).send(err)
    }
})

router.get('/all', (req, res) => {
    try {
        Course.find({}, (err, courses) => {
            var courseMap = {}
            courses.forEach(function(course) {
              courseMap[course._id] = course
            })
            res.json(courses)
        })
    } catch (err) {
        res.status(400).send(err)
    }
})

router.get('/fetch/:id', (req, res) => {
    try {
        Course.findOne({_id: req.params.id}, (err, course) => {
            res.send(course)
        })
    } catch (err) {
        res.status(400).send(err)
    }
})

module.exports = router