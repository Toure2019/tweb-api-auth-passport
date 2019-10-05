const express = require('express');

const router = express.Router();

router.post('/login', (req, res) => {
	// throw new Error('test');  // Lacer une erreur
	const { username, password } = req.body;
	res.send({ username, password: '*'.repeat(password.length) });
});

module.exports = router;