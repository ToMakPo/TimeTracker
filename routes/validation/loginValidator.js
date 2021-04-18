const validatorFactory = require("./validatorFactory")

const loginValidator = validatorFactory({
    username: { type: "string" },
    password: { type: "string", empty: false }
})

module.exports = loginValidator
