const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    name: {
        first: {
            type: String,
            trim: true,
            required: "Enter a first name"
        },
        last: {
            type: String,
            trim: true,
            required: "Enter a last name"
        }
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
    },
    logs: [{
        start: {
            type: Date,
            default: null
        },
        end: {
            type: Date,
            default: null
        },
        notes: {
            type: String,
            default: ''
        }
    }]
})

userSchema.methods.updateLogById = function(id, data) {
    for (const i in this.logs) {
        const log = this.logs[i]
        if (log._id.equals(id)) {
            for (const [key, value] of Object.entries(data)) {
                log[key] = value
            }
            this.save()
            break
        }
    }
}

const User = mongoose.model("user", userSchema)

module.exports = User