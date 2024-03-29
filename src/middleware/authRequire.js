const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const User = mongoose.model('User')

const AUTH_ERROR_MSG = 'You must log in'

/**
 * Middleware for checking authorization
 * @param req - incoming request
 * @param res - response from server
 * @param next - move on to next when called
 * @returns {*}
 */
module.exports = (req, res, next) => {
    const {authorization} = req.headers

    if (!authorization) {
        return res.status(401).send({error: AUTH_ERROR_MSG})
    }

    const token = authorization.replace('Bearer ', '')
    jwt.verify(
        token,
        process.env.SECRET_KEY,
        async (err, payload) => {
            if (err){
                return res.status(401).send({error: AUTH_ERROR_MSG})
            }

            const {userID} = payload

            const user = await User.findById(userID)

            req.user = user
            next()
        }
    )
}
