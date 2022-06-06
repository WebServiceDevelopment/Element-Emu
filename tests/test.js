"use strict";

const wallet = require('@sidetree/wallet')

const createRequest = require('./fixtures/createRequest.json');
const createResponse = require('./fixtures/createResponse.json');
const resolveResponse = require('./fixtures/resolveResponse.json');

const formulateResponse = () => {

	const didUniqueSuffix = wallet.computeDidUniqueSuffix(createRequest.suffixData);

	const publicKey = createRequest.delta.patches[0].document.publicKeys[0];
	publicKey.id = `#${publicKey.id}`;
	publicKey.controller = `did:elem:ganache:${didUniqueSuffix}`;

	const did = {
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
			"verificationMethod": [publicKey],
			"authentication": [publicKey.id],
			"assertionMethod": [publicKey.id]
		},
		"didDocumentMetadata": {
			"method": {
				"published": false,
				"recoveryCommitment": createRequest.suffixData.recoveryCommitment,
				"updateCommitment": createRequest.delta.updateCommitment
			},
			"canonicalId": publicKey.controller
		}
	}

	console.log("--- a ---");
	console.log(JSON.stringify(did, null, 2));

	console.log("--- b ---");
	console.log(JSON.stringify(createResponse, null, 2));

}

formulateResponse();
