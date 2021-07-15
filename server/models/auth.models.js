const mongoose = require('mongoose');
const crypto = require('crypto');
const { stringify } = require('querystring');

//User Schema
const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    usename: {
        type: String,
        trime: true,
        required: true
    }, 
    hashed_password: {
        //save as hash after encrypt
        type: password,
        required: true
    },
    salt: String,
    role: {
        type: String,
        default: 'Member'
    },
    resetPasswordLink: {
        data: String,
        default: ''
    }
}, {timeStamp: true})

userSchema.virtual('password')
    .set(password => {
        this.password = password
        this.salt = this.makeSalt()
        this.hashed_password = this.encryptPassword(password)
    })
    .get(() => {
        return this.password
    })

userSchema.methods = {
    makeSalt: () => {
        return Math.round(new Date().valueOf() * Math.random()) + ''
    },
    encryptPassword: (password) => {
        if (!password) return ''
        try {
            return crypto
                .createHmac('sha1', this.salt)
                .update(password)
                .digest('hex')
        } catch(err) {
            return ''
        }
    },
    authenticate: (plainPassword) => {
        return this.encryptPassword(plainPassword) === this.hashed_password
    }
}

module.exports = mongoose.model('User', userSchema);