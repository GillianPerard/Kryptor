const { readFileSync, writeFileSync } = require('fs')
const { join } = require('path')
const { generateKeys, privateEncrypt, publicDecrypt, publicEncrypt, privateDecrypt } = require('./rsa')

const PUBLIC_KEY_FILE_NAME = 'public.pem'
const PRIVATE_KEY_FILE_NAME = 'private.pem'

// Generate keys command
const generateKeysCmd = (keySize, destFolder) => {
    if (isNaN(keySize))
        throw new Error('Key size must be an integer.')

    const { publicKey, privateKey } = generateKeys(keySize)

    if (!destFolder) {
        console.log(publicKey)
        console.log(privateKey)
    } else {
        const publicKeyPath = join(destFolder, PUBLIC_KEY_FILE_NAME)
        const privateKeyPath = join(destFolder, PRIVATE_KEY_FILE_NAME)

        writeFileSync(publicKeyPath, publicKey)
        console.log('Public key has been saved.')

        writeFileSync(privateKeyPath, privateKey)
        console.log('Private key has been saved.')
    }
}

// Encrypt command
const encryptCmd = (keyPath, fileToEncrypt, destination, usePublicKey = true) => {
    if (!keyPath)
        throw new Error('Path of the key is required.')

    if (!fileToEncrypt)
        throw new Error('Path of file to encrypt is required.')

    const key = readFileSync(keyPath, 'utf-8')
    const textToEncrypt = readFileSync(fileToEncrypt)

    const encrypted = usePublicKey ? publicEncrypt(key, textToEncrypt) : privateEncrypt(key, textToEncrypt)
    writeFileSync(destination, encrypted)
    console.log('Encrypted file has been saved.')
}

// Decrypt command
const decryptCmd = (keyPath, fileToDecrypt, usePrivateKey = true) => {
    if (!keyPath)
        throw new Error('Path of the key is required.')

    const key = readFileSync(keyPath, 'utf-8')
    const textToDecrypt = readFileSync(fileToDecrypt, 'utf-8')
    const bufferToDecrypt = Buffer.from(textToDecrypt, 'base64')
    const decrypted = usePrivateKey ? privateDecrypt(key, bufferToDecrypt) : publicDecrypt(key, bufferToDecrypt)
    console.log(decrypted)
}

module.exports = { generateKeysCmd, encryptCmd, decryptCmd }
