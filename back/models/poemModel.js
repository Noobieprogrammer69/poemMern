const mongoose = require("mongoose")

const poemModel = mongoose.Schema({
    name: {
        type: String,
        trim: true,
        maxLength: 25,
        required: true
    },

    contents: {
        type: String,
        required: true
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('Poems', poemModel)