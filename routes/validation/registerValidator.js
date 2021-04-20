const validatorFactory = require("./validatorFactory")

const registerValidator = validatorFactory({
    firstName: "string",
    lastName: "string",
    username: "string",
    password: "string",
    confirm: "string",
    email: "string"
})

module.exports = registerValidator
