const mongoose = require('mongoose')

const userModel = mongoose.Schema({
    username: {
        type: String,
        trim: true,
        maxLength: 25,
        required: true
    },

    email: {
        type: String,
        trim: true,
        unique: true
    },

    password: {
        type: String,
        unique: true
    },

    avatar: {
        type: String,
        default:''
    },

    followers: {
        type: [String],
        default: []
    },

    following: {
        type: [String],
        default: []
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('Users', userModel)