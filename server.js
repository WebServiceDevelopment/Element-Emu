"use strict";

const express = require('express')
const wallet = require('@sidetree/wallet')

const app = express()
app.use(express.json())
const port = 4000

const db = require('better-sqlite3')('db.sqlite');
db.exec(`CREATE TABLE IF NOT EXISTS dids (
	id VARCHAR(64),
	document JSON NOT NULL,
	PRIMARY KEY(id)
)`);


app.get('/', (req, res) => {
	res.send('Hello World!')
})

app.post('/api/1.0/operations', (req, res) => {

	const createRequest = req.body;
	const didUniqueSuffix = wallet.computeDidUniqueSuffix(createRequest.suffixData);

	const publicKey = createRequest.delta.patches[0].document.publicKeys[0];
	publicKey.id = `#${publicKey.id}`;
	publicKey.controller = `did:elem:ganache:${didUniqueSuffix}`;

	const document = {
		"@context": "https://w3id.org/did-resolution/v1",
		"didDocument": {
			"@context": [
				"https://www.w3.org/ns/did/v1",
				"https://w3id.org/security/suites/jws-2020/v1",
				{
					"@vocab": "https://www.w3.org/ns/did#"
				}
			],
			"id": publicKey.controller,
			"verificationMethod": [
				{
					"id": publicKey.id,
					"controller": publicKey.controller,
					"type": publicKey.type,
					"publicKeyJwk": publicKey.publicKeyJwk
				}
			],
			"authentication": [publicKey.id],
			"assertionMethod": [publicKey.id]
		},
		"didDocumentMetadata": {
			"method": {
				"published": true,
				"recoveryCommitment": createRequest.suffixData.recoveryCommitment,
				"updateCommitment": createRequest.delta.updateCommitment
			},
			"canonicalId": publicKey.controller
		}
	}

	const stmt = db.prepare(`
		INSERT OR IGNORE INTO dids (
			id,
			document
		) VALUES ( 
			?,
			?
		)
	`);
	stmt.run([publicKey.controller, JSON.stringify(document)]);
	res.json(document);

});

app.get('/api/1.0/identifiers/:id', (req, res) => {

	const id = req.params.id;
	console.log(id);

	const { document } = db.prepare(`
		SELECT
			document
		FROM
			dids
		WHERE
			id = ?
	`).get(id);

	res.json(JSON.parse(document));

});

app.listen(port, () => {
	console.log(`Example app listening on port ${port}`)
})
