const mapValidationErrors = errors => errors.reduce((errors, { field, message }) => ({ ...errors, [field]: message }), {})

const validateBodyWith = validator => (req, res, next) => {
    const result = validator(req.body)
    /// If the body data is valid, continue to the next step...
    if (result === true) return next()
    /// ... otherwise, send an error response.
    res.status(400).json(mapValidationErrors(result))

}

module.exports = validateBodyWith
