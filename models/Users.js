const mongoose = require("mongoose")
const Company = require("./Company")

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        trim: true,
        required: "Enter a username",
        unique: true,
        match: ''
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
    companies: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: Company
    }]
})

const User = mongoose.model("user", userSchema)

module.exports = User