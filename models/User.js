const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: "Enter the user's name",
    },
    username: {
        type: String,
        trim: true,
        required: "Enter a username",
        unique: true
    },
    loginName: {
        type: String,
        trim: true,
        required: "Enter a login name",
        lowercase: true,
        unique: true
    },
    email: {
        type: String,
        trim: true,
        required: "Enter an email",
        lowercase: true,
        unique: true,
    },
    hash: {
        type: String,
        required: true,
        required: "Enter a password hash"
    },
    isAdmin: {
        type: Boolean,
        default: false
    }
})

const User = mongoose.model("user", userSchema)

module.exports = User