const mongoose = require("mongoose")
const User = require("./User")
const Employee = require("./Employee")

const companySchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: "Enter a name"
    },
    users: [{
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: User
        },
        permissionLevel: {
            type: Number,
            default: 1,
            min: 0
        }
    }],
    employees: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: Employee
    }]
})

const Company = mongoose.model("company", companySchema)

module.exports = Company