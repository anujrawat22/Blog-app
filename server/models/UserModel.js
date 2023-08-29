const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['admin', 'author', 'reader'], default: 'reader' }
})

const User = mongoose.model("User", UserSchema)

module.exports = { User }