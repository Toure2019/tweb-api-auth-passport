const express = require('express');

const router = express.Router();

router.get('/welcome', (req, res) => {
	res.send({ message: 'Hello world !'});
});

router.get('/me', (req, res) => {
	res.send({ user: null });
});

module.exports = router;