const validatorFactory = require("./validatorFactory")

const registerValidator = validatorFactory({
    name: "string",
    username: "string",
    password: "string",
    confirm: "string",
    email: "string"
})

module.exports = registerValidator
