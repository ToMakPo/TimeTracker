const mongoose = require("mongoose")

const employeeSchema = new mongoose.Schema({
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
    position: [{
        name: {
            type: String,
            trim: true,
            required: "Enter a position"
        },
        payPeriod: {
            /// What is the date that the first pay period starts? 
            beginning: Date,
            period: {
                type: String,
                enum: ["Daily", "Weekly", "Monthly", "Twice a Month"]
            },
            /// How many weeks is the pay period?
            count: {
                type: Number,
                min: 1
            },
            wages: {
                hourlyPay: Number,
                saturdayRate: Number,
                sundayRate: Number,
                holidayRate: Number,
                paidTimeOffRate: Number,
                overtimeRate: Number
            },
        },
    }],
    log: [{
        periodStart: Date,
        periodEnd: Date,
        shifts: [{
            position: {
                type: String,
                trim: true,
                required: "Enter a position"
            },
            start: Date,
            end: Date,
            breaks: [{
                start: Date,
                end: Date,
                paid: Boolean
            }],
            paidHours: Number,
            unpaidHours: Number,
            isHoliday: Boolean,
            isSaturday: Boolean,
            isSunday: Boolean,
            isVacation: Boolean
        }],
        wages: {
            hourlyPay: Number,
            saturdayRate: Number,
            sundayRate: Number,
            holidayRate: Number,
            paidTimeOffRate: Number,
            overtimeRate: Number
        },
        hours: {
            normal: Number,
            saturday: Number,
            sunday: Number,
            holiday: Number,
            paidTimeOff: Number,
            overtime: Number,
            unpaid: Number,
            checked: {
                type: Boolean,
                default: false
            }
        },
        payment: {
            income: [{
                name: String,
                catagory: String,
                rate: Number,
                hours: Number,
                total: Number
            }],
            deductions: [{
                name: String,
                catagory: String,
                total: Number
            }],
            net: Number,
            paid: {
                type: Number,
                default: 0
            }
        }
    }]
})

const Employee = mongoose.model("employee", employeeSchema)

module.exports = Employee