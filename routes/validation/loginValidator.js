const validatorFactory = require("./validatorFactory")

const loginValidator = validatorFactory({
    username: "string",
    password: "string"
})

module.exports = loginValidator
