const express = require('express')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const User = mongoose.model('User')
const router = express.Router()



/**
 * Post request that sign the user up for mixology
 */
router.post('/signup', async (req, res) => {
    const {email, password} = req.body

    try {
        const user = new User({email, password})

        await user.save()


        const token = jwt.sign({userID: user._id}, process.env.SECRET_KEY)

        res.send({token})
    } catch (err) {
        return res.status(422).send(err.message)
    }
})

/**
 * Post request to allow user to sign in
 */
router.post('/signin', async (req, res) => {
    const {email, password} = req.body

    if (!email || !password) {
        return res.status(422).send({error: "Must provide email and password"})
    }

    const user = await User.findOne({email})
    if(!user){
        return res.status(422).send({error: 'Invalid password or email'})

    }

    try{
        await user.comparePassword(password)
        const token = jwt.sign({userID: user._id}, process.env.SECRET_KEY)
        res.send({token})
    }catch (e){
        return res.status(422).send({error:'Invalid password or email'})
    }
})

module.exports = router
