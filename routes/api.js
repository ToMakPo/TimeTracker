const router = require("express").Router()
const { User } = require('../models')

router.get('/shift-logs/:userId', async (req, res) => {
    const { userId } = req.params
    try {
        const user = await User.findById(userId)
        res.status(200).json(user.logs)
    } catch (error) {
        res.status(500).json({message: 'Was not able to get user logs.'})
        console.error(error)
    }
})

router.post('/shift-logs/:userId', async (req, res) => {
    const { userId } = req.params
    const { data } = req.body
    try {
        const user = await User.findById(userId)
        user.logs.push(data)
        // TODO: sort the logs
        user.save()
        res.status(200).json(true)
    } catch (error) {
        res.status(500).json({message: 'Was not able to add log.'})
        console.error(error)
    }
})

router.put('/shift-logs/:userId', async (req, res) => {
    const { userId } = req.params
    const { logId, data } = req.body
    console.log({userId, logId, data});

    if ('end' in data) data.end = data.end || null

    try {
        const user = await User.findById(userId)
        user.updateLogById(logId, data)
        
        res.status(200).json(true)
    } catch (error) {
        res.status(500).json({message: 'Was not able to add log.'})
        console.error(error)
    }
})

router.delete('/shift-logs/:userId', async (req, res) => {
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
        res.status(500).json({message: 'Was not able to add log.'})
        console.error(error)
    }
})

module.exports = router