const router = require('express').Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../model/User')
const { registerValidation, loginValidation } = require('../validation')

router.post('/register', async (req, res) => {
    // LETS VALIDATE DATA BEFORE WE USER
    const { error } = registerValidation(req.body)
    if (error) return res.status(400).send(error.details[0].message)

    // Checking if user is already in the database
    const emailExist = await User.findOne({ email: req.body.email })
    if (emailExist) return res.status(400).send('Email already exists')

    // Hashed password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(req.body.password, salt)

    // Create a new user
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword
    })
    try {
        const savedUser = await user.save()
        res.send({ user: user._id })
    } catch (err) {
        res.status(400).send(err)
    }
})

router.post('/login', async (req, res) => {
    // LETS VALIDATE DATA BEFORE WE LOGIN
    const { error } = loginValidation(req.body)
    if (error) return res.status(400).send(error.details[0].message)

    // Checking if the email exists
    const user = await User.findOne({ email: req.body.email })
    if (!user) return res.status(400).send('Email is not found')

    //PASSWORD IS CORRECT
    const validPass = await bcrypt.compare(req.body.password, user.password)
    if (!validPass) return res.status(400).send('Invalid Password')

    //Create and assign a token
    const token = jwt.sign({ _id: user.id }, process.env.TOKEN_SECRET)
    res.header('auth-token', token).send({token: token, email: req.body.email, name: user.name, user: user._id})
})

module.exports = router