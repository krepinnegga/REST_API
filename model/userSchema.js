const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 255,
    },
    email: {
        type: String,
        required: true,
        minlength: 6,
        maxlength: 255,
    },
    password: {
        type: String,
        required: true,
        minlength: 7,
        maxlength: 1020,
     },
    date: {
        type: String,
        default: Date.now,
    },
})

module.exports = mongoose.model("Users", userSchema);