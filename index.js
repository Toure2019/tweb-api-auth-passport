require('dotenv/config');
const express = require('express');

const { port } = require('./config'); // process.env.PORT;
const api = require('./routes/api');
const auth = require('./routes/auth');

const app = express();

app.use(express.json()); // un middle contient du type qu'on envoi : parser les données en json

app.get('/', (req, res) => {
	res.send('Server running...');
});

app.use('/api', api);
app.use('/auth', auth);

// ajouter un middle qui gère les erreurs

app.use((err, req, res, next) => {
	console.error(err);
	res.status(500).send('Something went wrong !');
}); 


app.listen(port, () => {
	console.log(`Magic hâppens on http://localhost:${port}`);
});