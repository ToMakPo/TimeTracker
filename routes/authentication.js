const express = require("express")
const router = express.Router()
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const util = require("util")
const passwordHash = require("../config/passwordHash")
const authenticateUser = require("./middleware/authenticateUser")
const validateBodyWith = require("./middleware/validateBodyWith")
const { loginValidator, registerValidator } = require("./validation")
const { User } = require("../models")

const jwtSign = util.promisify(jwt.sign)

router.post("/authenticated", authenticateUser, (req, res) => {
    res.json(req.user)
})

router.post("/login", validateBodyWith(loginValidator), async (req, res) => {
    const { username, password } = req.body
    const loginName = username.toLowerCase()

    try {
        const user = await User.findOne({ $or: [{ loginName, email: loginName }]})

        if (!user) {
            /// If the username was not found, then return an error message.
            return res.status(404).json({ default: "username or password is invalid." })
        }

        const { hash, ...userData } = user._doc

        const isMatch = await bcrypt.compare(password, hash)

        if (!isMatch) {
            /// If the password was wrong, then return an error message.
            return res.status(404).json({ default: "username or password is invalid." })
        }

        const payload = { id: userData._id, username: userData.username }

        /// Create a signed JWT token to send back to the client for reauthentication.
        const token = await jwtSign(payload, process.env.JWT_SECRET, {
            expiresIn: 31556926 /// 1 year in seconds
        })

        return res.json({
            success: true,
            token: "Bearer " + token,
            user: userData
        })
    } catch (err) {
        console.error(err)
        res.status(500).json({ default: "Something went wrong trying to log in." })
    }
})

const usernamePattern = /^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/
const passwordPattern = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*?&])([a-zA-Z0-9@$!%*?&]{8,})$/
const emailPattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/

router.post("/register", validateBodyWith(registerValidator), async (req, res) => {
    try {
        const { username, password, confirm } = req.body
        const email = req.body.email.toLowerCase()
        const loginName = username.toLowerCase()

        if (!usernamePattern.test(username)) {
            return res.status(400).json({ focus: "username", message: "The username is not valid." })
        }

        if (!emailPattern.test(email)) {
            return res.status(400).json({ focus: "email", message: "The email is not valid." })
        }

        if (!passwordPattern.test(password)) {
            return res.status(400).json({ focus: "password", message: "The password is not valid." })
        }

        if (confirm !== password) {
            return res.status(400).json({ focus: "confirm", message: "The password confirmation does not match the password." })
        }

        if (await User.findOne({ loginName })) {
            return res.status(400).json({ focus: "username", message: "This username already exists." })
        }

        if (await User.findOne({ email })) {
            return res.status(400).json({ focus: "login", message: "There is already an account connected to this email address." })
        }

        const newUser = new User({
            username,
            loginName,
            email,
            hash: await passwordHash(password)
        })

        await newUser.save()

        const { hash,  ...userData } = newUser._doc

        res.status(200).json(userData)

    } catch (err) {
        console.error(err)
        res.status(500).json({ message: "Something went wrong creating your account." })
    }
})

module.exports = router
