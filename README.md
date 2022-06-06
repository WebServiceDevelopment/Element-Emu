# Element-Emu

A simple emulator for working with Element. This emulator works on a single node, so rather than reading or writing from a ledger, it takes create operations and writes them directly to a database. And returns resolve requests directly from the database. Not intented for real-world use, but can help to have a light server for testing create and resolve requests from a client.

**Create Request**

```
{
  "type": "create",
  "suffixData": {
    "deltaHash": "EiAkTEowLRj-UGw90fntvw8r9_X1q8kIPzcc1LFknLwLIQ",
    "recoveryCommitment": "EiCwrerKfTxlH43o-xJoZ6QiGgNL2iytf-PIH-DOPefiag"
  },
  "delta": {
    "updateCommitment": "EiAOqDzWui0Dl9YR1V09FFWOZnt_BcuFDO5hUff7ntA6uw",
    "patches": [
      {
        "action": "replace",
        "document": {
          "publicKeys": [
            {
              "id": "z6Mkh8XQXHVQyyGjTnxKvuSTW2rXYJqBxjgx6vP4ekDaN55u",
              "type": "JsonWebKey2020",
              "publicKeyJwk": {
                "kty": "OKP",
                "crv": "Ed25519",
                "x": "J8Zk3p6AZkEgxDKav2cSXToAyDoCd1s8t7nk-UahicQ"
              },
              "purposes": [
                "authentication",
                "assertionMethod"
              ]
            }
          ]
        }
      }
    ]
  }
}
```

**Create Response**

```
{
  "@context": "https://w3id.org/did-resolution/v1",
  "didDocument": {
    "@context": [
      "https://www.w3.org/ns/did/v1",
      "https://w3id.org/security/suites/jws-2020/v1",
      {
        "@vocab": "https://www.w3.org/ns/did#"
      }
    ],
    "id": "did:elem:ganache:EiDIZLxuRx76gFn0WRk1WIpD9Pf38IWKcvBiRlh56Z4FUQ",
    "verificationMethod": [
      {
        "id": "#z6Mkh8XQXHVQyyGjTnxKvuSTW2rXYJqBxjgx6vP4ekDaN55u",
        "controller": "did:elem:ganache:EiDIZLxuRx76gFn0WRk1WIpD9Pf38IWKcvBiRlh56Z4FUQ",
        "type": "JsonWebKey2020",
        "publicKeyJwk": {
          "kty": "OKP",
          "crv": "Ed25519",
          "x": "J8Zk3p6AZkEgxDKav2cSXToAyDoCd1s8t7nk-UahicQ"
        }
      }
    ],
    "authentication": [
      "#z6Mkh8XQXHVQyyGjTnxKvuSTW2rXYJqBxjgx6vP4ekDaN55u"
    ],
    "assertionMethod": [
      "#z6Mkh8XQXHVQyyGjTnxKvuSTW2rXYJqBxjgx6vP4ekDaN55u"
    ]
  },
  "didDocumentMetadata": {
    "method": {
      "published": false,
      "recoveryCommitment": "EiCwrerKfTxlH43o-xJoZ6QiGgNL2iytf-PIH-DOPefiag",
      "updateCommitment": "EiAOqDzWui0Dl9YR1V09FFWOZnt_BcuFDO5hUff7ntA6uw"
    },
    "canonicalId": "did:elem:ganache:EiDIZLxuRx76gFn0WRk1WIpD9Pf38IWKcvBiRlh56Z4FUQ"
  }
}
```

**Resolve Response**
```
{
  "@context": "https://w3id.org/did-resolution/v1",
  "didDocument": {
    "@context": [
      "https://www.w3.org/ns/did/v1",
      "https://w3id.org/security/suites/jws-2020/v1",
      {
        "@vocab": "https://www.w3.org/ns/did#"
      }
    ],
    "id": "did:elem:ganache:EiDIZLxuRx76gFn0WRk1WIpD9Pf38IWKcvBiRlh56Z4FUQ",
    "verificationMethod": [
      {
        "id": "#z6Mkh8XQXHVQyyGjTnxKvuSTW2rXYJqBxjgx6vP4ekDaN55u",
        "controller": "did:elem:ganache:EiDIZLxuRx76gFn0WRk1WIpD9Pf38IWKcvBiRlh56Z4FUQ",
        "type": "JsonWebKey2020",
        "publicKeyJwk": {
          "kty": "OKP",
          "crv": "Ed25519",
          "x": "J8Zk3p6AZkEgxDKav2cSXToAyDoCd1s8t7nk-UahicQ"
        }
      }
    ],
    "authentication": [
      "#z6Mkh8XQXHVQyyGjTnxKvuSTW2rXYJqBxjgx6vP4ekDaN55u"
    ],
    "assertionMethod": [
      "#z6Mkh8XQXHVQyyGjTnxKvuSTW2rXYJqBxjgx6vP4ekDaN55u"
    ]
  },
  "didDocumentMetadata": {
    "method": {
      "published": true,
      "recoveryCommitment": "EiCwrerKfTxlH43o-xJoZ6QiGgNL2iytf-PIH-DOPefiag",
      "updateCommitment": "EiAOqDzWui0Dl9YR1V09FFWOZnt_BcuFDO5hUff7ntA6uw"
    },
    "canonicalId": "did:elem:ganache:EiDIZLxuRx76gFn0WRk1WIpD9Pf38IWKcvBiRlh56Z4FUQ"
  }
}
```
