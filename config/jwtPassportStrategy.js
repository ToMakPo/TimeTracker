const JwtStrategy = require("passport-jwt").Strategy
const ExtractJwt = require("passport-jwt").ExtractJwt
const { User } = require('../models')

const opts = {}

opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken()
opts.secretOrKey = process.env.JWT_SECRET

const authorizeJwtToken = (jwtPayload, done) => {
    User.findById(jwtPayload.id)
        // .select("name username email isAdmin stayLoggedIn")
        .then(user => done(null, user || false))
        .catch(err => {
            console.error(err)
            done(null, false)
        })
}

module.exports = new JwtStrategy(opts, authorizeJwtToken)