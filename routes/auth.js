const express = require('express');
const passport = require('passport');
const passportLocal = require('passport-local');
const passportJWT = require('passport-jwt');
const jwt = require('jsonwebtoken');
const { jwtOptions } = require('../config');

const USER = {
	id: '0123456789',
	username: 'admin',
	password: 'admin',
	email: 'admin@admin.com'
}

const router = express.Router();
const LocalStragy = passportLocal.Strategy;		// Créer la tratégie (local)
const JWTStrategy = passportJWT.Strategy;		// Créer la stratégie (jwt)
const ExtractJwt = passportJWT.ExtractJwt;

// Utiliser la stratégie (local) // par defaut 'local'
passport.use('myLocal', new LocalStragy(
	{
		usernameField: 'username',
		passwordField: 'password'
	},
	(username, password, done) => {		// Fonction (verify)
		// Database query : au cas d'un appel à une BD
		if (username === USER.username && password === USER.password) {
			return done(null, USER);
		} else {
			return done(null, false);
		}
	}
));

// Strategy: authentifier un user par son token
passport.use(new JWTStrategy(
	{
		secretOrKey: jwtOptions.secret,
		jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
	},
	(jwtPayload, done) => {			// Fonction (verify)
		const { userId } = jwtPayload;
		if (userId !== USER.id) {
			return done(null, false); // l'user n'existe pas
		}
		return done(null, USER);
	}
));

router.post('/login', passport.authenticate('myLocal', { session: false }), (req, res) => {
	const {password, ...user} = req.user;
	const token = jwt.sign({ userId: user.id }, jwtOptions.secret);
	res.send({ user, token });
});

module.exports = router;