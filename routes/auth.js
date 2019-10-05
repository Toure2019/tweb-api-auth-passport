const express = require('express');
const jwt = require('jsonwebtoken');
const { jwtOptions } = require('../config');

const USER = {
	id: '0123456789',
	username: 'admin',
	password: 'admin'
}

const router = express.Router();

router.post('/login', (req, res) => {
	// throw new Error('test');  // Lacer une erreur
	const { username, password } = req.body;

	if (username === USER.username && password === USER.password) {
		const token = jwt.sign({userId: USER.id}, jwtOptions.secret);
		const decoded = jwt.verify(token, jwtOptions.secret);
		return res.send({ token, decoded });
	}
	// res.send({ username, password: '*'.repeat(password.length) });
	return res.sendStatus(401);
});

module.exports = router;