const mongoose = require("mongoose")
const Employee = require("./Employee")

const companySchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: "Enter a name"
    },
    employees: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: Employee
    }]
})

const Company = mongoose.model("company", companySchema)

module.exports = Company