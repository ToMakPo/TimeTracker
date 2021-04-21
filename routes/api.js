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
        res.status(200).json(user.logs)
    } catch (error) {
        res.status(500).json({message: 'Was not able to add log.'})
        console.error(error)
    }
})

router.put('/shift-logs/:userId', async (req, res) => {
    const { userId } = req.params
    const { logId, data } = req.body

    if ('end' in data) data.end = data.end || null

    try {
        const user = await User.findById(userId)
        user.updateLogById(logId, data)
        
        res.status(200).json(user.logs)
    } catch (error) {
        res.status(500).json({message: 'Was not able to update log.'})
        console.error(error)
    }
})

router.delete('/shift-logs/:userId/:logId', async (req, res) => {
    const { userId, logId } = req.params
    try {
        const user = await User.findById(userId)

        for (const i in user.logs) {
            if (user.logs[i]._id == logId) {
                user.logs.splice(i, 1)
        
                user.save()
                res.status(200).json(user.logs)
                return
            }
        }
        res.status(400).json({message: 'No log with that id was found.'})
    } catch (error) {
        res.status(500).json({message: 'Was not able to delete log.'})
        console.error(error)
    }
})

module.exports = router