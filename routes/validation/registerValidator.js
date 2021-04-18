const validatorFactory = require("./validatorFactory")

const registerValidator = validatorFactory({
    username: { type: "string" },
    password: { type: "string", empty: false }
})

module.exports = registerValidator
