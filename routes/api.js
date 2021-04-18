const router = require("express").Router()
const db = require('../models')

router.get('/user-companies/:id', async (req, res) => {
    const { id } = req.params
    const companies = await db.Company.find({ employees: id })
    res.json(companies)
})

module.exports = router