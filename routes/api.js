const router = require("express").Router()
const { User } = require('../models')

router.get('/user-logs/:userId', async (req, res) => {
    const { userId } = req.params
    try {
        const user = await User.findById(userId)
        res.status(200).json(user.logs)
    } catch (error) {
        res.status(500).json({message: 'Was not able to get user logs.', error})
    }
})

router.post('/user-logs/:userId', async (req, res) => {
    const { userId } = req.params
    const { log } = req.body
    try {
        const user = await User.findById(userId)
        user.logs.push(log)
        // TODO: sort the logs
        user.save()
        res.status(200).json(true)
    } catch (error) {
        res.status(500).json({message: 'Was not able to add log.', error})
    }
})

router.put('/user-logs/:userId', async (req, res) => {
    const { userId } = req.params
    const { logID, updates } = req.body
    try {
        const user = await User.findById(userId)
        const log = await user.logs.findById(logID)

        for (const [key, value] of Object.entries(updates)) {
            log[key] = value
        }
        
        // TODO: sort the logs
        user.save()
        res.status(200).json(true)
    } catch (error) {
        res.status(500).json({message: 'Was not able to add log.', error})
    }
})

router.delete('/user-logs/:userId', async (req, res) => {
    const { userId } = req.params
    const { logID } = req.body
    try {
        const user = await User.findById(userId)
        const log = await user.logs.findById(logID)

        for (const [key, value] of Object.entries(updates)) {
            log[key] = value
        }
        
        user.save()
        res.status(200).json(true)
    } catch (error) {
        res.status(500).json({message: 'Was not able to add log.', error})
    }
})

module.exports = router