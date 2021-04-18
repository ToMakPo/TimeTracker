const Validator = require("fastest-validator")
const { ObjectID } = require("mongodb")

const validator = new Validator({ defaults: { objectID: { ObjectID }}})

const validatorFactory = schema => validator.compile({
    $$strict: "remove",
    ...schema
})

module.exports = validatorFactory
