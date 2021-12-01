const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

/**
 * User schema for mongoose
 */
const userSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    }
})

/**
 * Hashes and salts the users password
 */
userSchema.pre('save', function (next) {
    const user = this

    if (!user.isModified('password')) {
        return next()
    }

    bcrypt.genSalt(10, (error, salt) => {
        if (error) {
            return next(error)
        }

        bcrypt.hash(user.password, salt, (error, hash) => {
            if (error) {
                return next(error)
            }
            user.password = hash
            next()
        })

    })
})

/**
 * Compares the users password with the sent password
 * @param password
 * @returns {Promise<unknown>}
 */
userSchema.methods.comparePassword = function (password) {
    const user = this

    return new Promise((resolve, reject)=>{
        bcrypt.compare(password, user.password, ((error, isMatch)=>{
            if(error){
                return reject(error)
            }

            if(!isMatch){
                return reject(false)
            }

            resolve(true)
        }))
    })
}

/**
 * Creates the model for the user based on the user schema
 */
mongoose.model('User', userSchema)
