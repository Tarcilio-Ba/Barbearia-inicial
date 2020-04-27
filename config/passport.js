const {authSercret} = require('../.env')
const passport = require('passport')
const passportJwt = require('passport-jwt')
const {Strategy, ExtractJwt} = passportJwt


module.exports = app => {
    const params = {
        secretOrkey: authSercret,
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
    }

    const strategy = new Strategy(params, (payload, done) => {
        app.db('barbearias')
            .where({Codbarbearia: payload.Codbarbearia})
            .first()
            .then(barbearia => done(null, barbearia ? {...payload} : false))
            .catch(err => done(err, false))
    })

    passport.barbearia(strategy)

    return {
        authenticate: () => passport.authenticate('jwt', {session: false})
    }
}