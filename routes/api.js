const router = require("express").Router()
const db = require('../models')

// router.get('/lobby/:code', (req, res) => {
//     db.Lobby
//         .find({ code: req.params.code })
//         .then(data => res.json(data))
//         .catch(err => res.status(422).json(err))
// })

module.exports = router