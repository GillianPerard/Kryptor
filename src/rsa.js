const crypto = require('crypto')

const RSA = 'rsa'
const ALGORITHM = 'RSA-SHA256'
const FORMAT = 'pem'
const OPTIONS = {
    modulusLength: 4096,
    publicKeyEncoding: {
        type: 'spki',
        format: FORMAT
    },
    privateKeyEncoding: {
        type: 'pkcs8',
        format: FORMAT
    }
}

/**
 * Function to generate a public and private RSA key
 * @param modulusLength The key size in bits
 */
const generateKeys = (modulusLength) => {
    if (modulusLength) {
        OPTIONS.modulusLength = +modulusLength
    }
    return crypto.generateKeyPairSync(RSA, OPTIONS)
}

/**
 * Function to encrypt a text with the private key
 * @param privateKey The specified private key
 * @param textToEncrypt The text to encrypt
 */
const privateEncrypt = (privateKey, textToEncrypt) => {
    return crypto.privateEncrypt(privateKey, textToEncrypt).toString('base64')
}

/**
 * Function to decrypt a text with the public key
 * @param publicKey The specified public key
 * @param textToDecrypt The text to decrypt
 */
const publicDecrypt = (publicKey, textToDecrypt) => {
    return crypto.publicDecrypt(publicKey, textToDecrypt).toString('utf-8')
}

/**
 * Function to encrypt a text with the public key
 * @param publicKey The specified public key
 * @param textToEncrypt The text to encrypt
 */
const publicEncrypt = (publicKey, textToEncrypt) => {
    return crypto.publicEncrypt(publicKey, textToEncrypt).toString('base64')
}

/**
 * Function to decrypt a text with the private key
 * @param privateKey The specified private key
 * @param textToDecrypt The text to decrypt
 */
const privateDecrypt = (privateKey, textToDecrypt) => {
    return crypto.privateDecrypt(privateKey, textToDecrypt).toString('utf-8')
}

/**
 * Function to sign a text with the private key
 * @param privateKey The specified private key
 * @param textToSign The text to sign
 */
const sign = (privateKey, textToSign) => {
    const s = crypto.createSign(ALGORITHM)
    s.update(textToSign)
    return s.sign(privateKey, 'base64')
}

/**
 * Function to verify a signature to validate a document with the public key
 * @param publicKey The specified public key
 * @param textToVerify The text to verify
 * @param signature The signature
 */
const verify = (publicKey, textToVerify, signature) => {
    const v = crypto.createVerify(ALGORITHM)
    v.update(textToVerify)
    return v.verify(publicKey, signature, 'base64')
}

module.exports = { generateKeys, privateEncrypt, publicDecrypt, publicEncrypt, privateDecrypt, sign, verify }
