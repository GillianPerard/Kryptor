const crypto = require('crypto')

const RSA = 'rsa'
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
 */
const generateKeys = () => {
    return crypto.generateKeyPairSync(RSA, OPTIONS)
}

/**
 * Function to encrypt a text with the private key
 * @param privateKey The specified private key
 * @param textToEncrypt The text to encrypt
 */
const privateEncrypt = (privateKey, textToEncrypt) => {
    return crypto.privateEncrypt(privateKey, textToEncrypt).toString('hex')
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
    return crypto.publicEncrypt(publicKey, textToEncrypt).toString('hex')
}

/**
 * Function to decrypt a text with the private key
 * @param privateKey The specified private key
 * @param textToDecrypt The text to decrypt
 */
const privateDecrypt = (privateKey, textToDecrypt) => {
    return crypto.privateDecrypt(privateKey, textToDecrypt).toString('utf-8')
}

module.exports = { generateKeys, privateEncrypt, publicDecrypt, publicEncrypt, privateDecrypt }
