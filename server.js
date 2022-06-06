const express = require('express')
const app = express()
app.use(express.json())
const port = 4000

app.get('/', (req, res) => {
	res.send('Hello World!')
})

app.post('/api/1.0/operations', (req, res) => {

	console.log(req.body);
	res.end('okay');

});

app.get('/api/1.0/identifiers/:id', (req, res) => {

	const id = req.query('id')
	console.log(id);
	res.end('mkay');

});

app.listen(port, () => {
	console.log(`Example app listening on port ${port}`)
})
