const express = require('express');
const passport = require('passport');

const router = express.Router();
const authenticated = () => passport.authenticate('jwt', { session: false });

router.get('/public', (req, res) => {
	res.send({ message: 'This is a public roure !' });
});

router.get('/private', authenticated(), (req, res) => {
	res.send({ message: 'Hello world ! this is a private message' });
});

router.get('/me', authenticated(), (req, res) => {
	res.send({ user: null });
});

module.exports = router;