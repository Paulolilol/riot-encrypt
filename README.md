# Riot Takehome Task Specification

Your task is to implement a REST API which:

1. Has two endpoints `/encrypt` and `/decrypt`. Each endpoint should take
a JSON payload.
2. Use **Base64** to implement encryption and decryption on the
`/encrypt` and `/decrypt` endpoints respectively.
   - `/encrypt` should encrypt every value in the object (at a depth of 1), returning the encrypted payload as JSON.
   - `/decrypt` should detect encrypted strings and decrypt them, returning the decrypted payload as JSON.

   For example:
   ```JSON
   {
     "foo": "foobar",
     "bar": {
       "isBar": true
     }
   }
   ```
   would become
   ```JSON
   {
     "foo": "some_encrypted_string",
     "bar": "some_encrypted_string"
   }
   ```
3. The **Base64** encryption algorithm should be easily replaceable with another algorithm without requiring significant changes to the codebase.
4. Create a `/sign` endpoint which takes a JSON payload and computes a
cryptographic signature for the plaintext payload in HMAC. The signature is then
sent in a JSON response.
5. Create a `/verify` endpoint, which takes a JSON payload of the form
```js
{
   "signature": "<COMPUTED_SIGNATURE>",
   "data": {
      // ...
   }
}
```
- Data can be any JSON object.
- If the provided signature matches the computed signature, the response code should be `204`; otherwise, it should be `400`.

6. How to run, at the root of the project run
* define your secret-key:  export SECRET_KEY = {secret}
* npm install
* npm run build
* npm run start

7. See curl example request in curl.txt

7.Example commands

---

## 1. Encrypt

### Description
Encrypts input data and returns the encrypted result.

### Endpoint
`GET http://localhost:3000/v1/encrypt`

### Request Headers
```http
Content-Type: application/json
```

### Request Body
```json
{
    "stringInput": "tata",
    "booleanInput": false,
    "numberInput": 1,
    "objInput": {
        "myFirstProp": "toto",
        "mySecondProp": "tutu",
        "arrayProp": [
            1,
            2
        ]
    },
    "arrayInput": [
        1,
        "tutu",
        {}
    ]
}
```

### Example cURL Command
```bash
curl --location --request GET 'http://localhost:3000/v1/encrypt' \
--header 'Content-Type: application/json' \
--data '{
    "stringInput": "tata",
    "booleanInput": false,
    "numberInput": 1,
    "objInput": {
        "myFirstProp": "toto",
        "mySecondProp": "tutu",
        "arrayProp": [
            1,
            2
        ]
    },
    "arrayInput": [
        1,
        "tutu",
        {}
    ]
}'
```

---

## 2. Decrypt

### Description
Decrypts input data from base64-encoded strings to their original format.

### Endpoint
`GET http://localhost:3000/v1/decrypt`

### Request Headers
```http
Content-Type: application/json
```

### Request Body
```json
{
    "stringInput": "InRhdGEi",
    "booleanInput": "ZmFsc2U=",
    "numberInput": "MQ==",
    "objInput": "eyJteUZpcnN0UHJvcCI6InRvdG8iLCJteVNlY29uZFByb3AiOiJ0dXR1IiwiYXJyYXlQcm9wIjpbMSwyXX0=",
    "arrayInput": "WzEsInR1dHUiLHt9XQ=="
}
```

### Example cURL Command
```bash
curl --location --request GET 'http://localhost:3000/v1/decrypt' \
--header 'Content-Type: application/json' \
--data '{
    "stringInput": "InRhdGEi",
    "booleanInput": "ZmFsc2U=",
    "numberInput": "MQ==",
    "objInput": "eyJteUZpcnN0UHJvcCI6InRvdG8iLCJteVNlY29uZFByb3AiOiJ0dXR1IiwiYXJyYXlQcm9wIjpbMSwyXX0=",
    "arrayInput": "WzEsInR1dHUiLHt9XQ=="
}'
```

---

## 3. Sign

### Description
Signs the provided input data and returns a signature.

### Endpoint
`GET http://localhost:3000/v1/sign`

### Request Headers
```http
Content-Type: application/json
```

### Request Body
```json
{
    "stringInput" : "tata",
    "numberInput" : 1,
    "objInput" : {"myFirstProp" : "toto", "mySecondProp": "tutu"},
    "arrayInput" : [1, "tutu", {}]
}
```

### Example cURL Command
```bash
curl --location --request GET 'http://localhost:3000/v1/sign' \
--header 'Content-Type: application/json' \
--data '{
    "stringInput" : "tata",
    "numberInput" : 1,
    "objInput" : {"myFirstProp" : "toto", "mySecondProp": "tutu"},
    "arrayInput" : [1, "tutu", {}]
}'
```

---

## 4. Verify

### Description
Verifies a signature for the provided data.

### Endpoint
`GET http://localhost:3000/v1/verify`

### Request Headers
```http
Content-Type: application/json
```

### Request Body
```json
{
    "signature": "b099bc9873564bf9b02e91584ce050b628cf3607698133cf49131fc8f42263e6",
    "data" : {
        "stringInput" : "tata",
        "numberInput" : 1,
        "objInput" : {"myFirstProp" : "toto", "mySecondProp": "tutu"},
        "arrayInput" : [1, "tutu", {}]
    }
}
```

### Example cURL Command
```bash
curl --location --request GET 'http://localhost:3000/v1/verify' \
--header 'Content-Type: application/json' \
--data '{
    "signature": "b099bc9873564bf9b02e91584ce050b628cf3607698133cf49131fc8f42263e6",
    "data" : {
        "stringInput" : "tata",
        "numberInput" : 1,
        "objInput" : {"myFirstProp" : "toto", "mySecondProp": "tutu"},
        "arrayInput" : [1, "tutu", {}]
    }
}'
```
