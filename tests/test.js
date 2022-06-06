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
				"published": false,
				"recoveryCommitment": createRequest.suffixData.recoveryCommitment,
				"updateCommitment": createRequest.delta.updateCommitment
			},
			"canonicalId": publicKey.controller
		}
	}

	const a = JSON.stringify(did, null, 2);
	const b = JSON.stringify(createResponse, null, 2);
	return a === b;

}

const formulateResolve = () => {

	createResponse.didDocumentMetadata.method.published = true;
	const a = JSON.stringify(createResponse, null, 2);
	const b = JSON.stringify(resolveResponse, null, 2);
	return a === b;

}

formulateResponse();
formulateResolve();
