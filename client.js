"use strict";

// Imports

const axios = require('axios')
const bip39 = require('bip39')
const sleep = require('sleep-promise')
const wallet = require('@sidetree/wallet')

// Generate Key Function

async function* generateKey() {

    const mnemonic = bip39.generateMnemonic();
    const keyType = 'Ed25519';
    let index = 0;

    while(true) {
        const hdPath = `m/44'/60'/0'/0/${index}`;
        const key = await wallet.toKeyPair(mnemonic, keyType, hdPath)
        yield key;
        index++;
    }

}

const createDid = async() => {

    const host = 'http://localhost:3000';

    const keygen = generateKey();
    const { value : publicKey } = await keygen.next();
    const { value : recoveryKey } = await keygen.next();
    const { value : updateKey } = await keygen.next();

    const createArgs = {
        document : {
            publicKeys: [
                {
                    id: publicKey.id.split('#').pop(),
                    type: publicKey.type,
                    publicKeyJwk: publicKey.publicKeyJwk,
                    purposes: ['authentication', 'assertionMethod']
                }
            ]
        },
        recoveryKey : recoveryKey.publicKeyJwk,
        updateKey : updateKey.publicKeyJwk
    };

    const createOperation = await wallet.operations.create(createArgs);
    const didUniqueSuffix = wallet.computeDidUniqueSuffix(createOperation.suffixData);

	console.log('--- CREATE ARGS ---');
	console.log(JSON.stringify(createOperation, null, 2));

    const url = `${host}/api/1.0/operations`;
    const { status, data } = await axios.post(url, createOperation);

	console.log('--- POST RESPONSE ---');
	console.log(JSON.stringify(data, null, 2));

    const { id } = data.didDocument;

    await sleep(10 * 1000);
    const getUrl = `${host}/api/1.0/identifiers/${id}`;

    try {
        const res = await axios.get(getUrl)
        console.log(res.status);
        console.log(res.data.didDocument);

		console.log('--- GET RESPONSE ---');
		console.log(JSON.stringify(res.data, null, 2));
    } catch(err) {
        console.log(err.code);
    }

}

createDid();

