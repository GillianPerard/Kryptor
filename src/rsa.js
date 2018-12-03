const { generateKeyPair, privateEncrypt, publicDecrypt } = require('crypto')
const { writeFile } = require('fs')

const RSA = 'rsa'
const OPTIONS = {
    modulusLength: 4096,
    publicKeyEncoding: {
        type: 'spki',
        format: 'pem'
    },
    privateKeyEncoding: {
        type: 'pkcs8',
        format: 'pem',
        cipher: 'aes-256-cbc',
        passphrase: 'myPassphrase'
    }
}
const PUBLIC_KEY_FILE_NAME = 'public.pem'
const PRIVATE_KEY_FILE_NAME = 'private.pem'

/**
 * Function to generate a public and private RSA key
 * @param destFolder The destination folder
 */
const generateKeys = (destFolder) => {
    generateKeyPair(RSA, OPTIONS, (gErr, publicKey, privateKey) => {

        if (gErr) throw new Error('Keys generation failed.')
        console.log(publicKey, privateKey)

        const publicKeyPath = `${destFolder}/${PUBLIC_KEY_FILE_NAME}`
        writeFile(publicKeyPath, publicKey, 'utf-8', (wErr) => {
            if (wErr) throw new Error('Write public key failed.')
            console.log('Public key has been saved.')
        })

        const privateKeyPath = `${destFolder}/${PRIVATE_KEY_FILE_NAME}`
        writeFile(privateKeyPath, privateKey, 'utf-8', (wErr) => {
            if (wErr) throw new Error('Write private key failed.')
            console.log('Private key has been saved.')
        })

    })
}

/**
 * Function to encrypt a text with the private key
 * @param privateKey The specified private key
 * @param textToEncrypt The text to encrypt
 */
const encrypt = (privateKey, textToEncrypt) => {
    return privateEncrypt(privateKey, textToEncrypt)
}

/**
 * Function to decrypt a text with the public key
 * @param publicKey The specified public key
 * @param textToDecrypt The text to decrypt
 */
const decrypt = (publicKey, textToDecrypt) => {
    return publicDecrypt(publicKey, textToDecrypt)
}

module.exports.generateKeys = generateKeys
module.exports.encrypt = encrypt
module.exports.decrypt = decrypt
