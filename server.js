require("dotenv").config()
const express = require("express")
const mongoose = require("mongoose")
const apiRoutes = require("./routes")
const PORT = process.env.PORT

/// EXPRESS ///
const app = express()
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

/// PASSPORT ///
const passport = require("passport")
app.use(passport.initialize())
passport.use(require("./config/jwtPassportStrategy"))

/// ENVIORNMENT ///
app.use(process.env.NODE_ENV === "production" 
    ? express.static("client/build")
    : express.static("public")
)

/// MONGOOSE ///
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
})

/// ROUTES ///
app.use("/api", require("./routes/authentication"))
app.use(apiRoutes)

/// SERVER ///
app.listen(PORT, () => {
    console.info(`App running on http://localhost:${PORT}`)
})

