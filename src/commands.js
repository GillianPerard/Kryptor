const { readFileSync, writeFileSync } = require('fs')
const { join } = require('path')

const { generateKeys, privateEncrypt, publicDecrypt, publicEncrypt, privateDecrypt, sign, verify } = require('./rsa')

const PUBLIC_KEY_FILE_NAME = 'public.pem'
const PRIVATE_KEY_FILE_NAME = 'private.pem'

// Generate keys command
const generateKeysCmd = (keySize, destFolder) => {
    if (isNaN(keySize)) { throw new Error('Key size must be an integer.') }

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
const encryptCmd = (keyPath, fileToEncrypt, destination, usePublicKey) => {
    if (!keyPath) {
        throw new Error('Path of the key is required.')
    }

    if (!fileToEncrypt) {
        throw new Error('Path of file to encrypt is required.')
    }

    const key = readFileSync(keyPath, 'utf-8')
    const textToEncrypt = readFileSync(fileToEncrypt)

    const encrypted = usePublicKey ? publicEncrypt(key, textToEncrypt) : privateEncrypt(key, textToEncrypt)

    if (!destination) {
        console.log(encrypted)
    } else {
        writeFileSync(destination, encrypted)
        console.log('Encrypted file has been saved.')
    }
}

// Decrypt command
const decryptCmd = (keyPath, fileToDecrypt, destination, usePublicKey) => {
    if (!keyPath) {
        throw new Error('Path of the key is required.')
    }

    if (!fileToDecrypt) {
        throw new Error('Path of file to decrypt is required.')
    }

    const key = readFileSync(keyPath, 'utf-8')
    const textToDecrypt = readFileSync(fileToDecrypt, 'utf-8')
    const bufferToDecrypt = Buffer.from(textToDecrypt, 'base64')
    const decrypted = usePublicKey ? publicDecrypt(key, bufferToDecrypt) : privateDecrypt(key, bufferToDecrypt)

    if (!destination) {
        console.log(decrypted)
    } else {
        writeFileSync(destination, decrypted)
        console.log('Decrypted file has been saved.')
    }
}

const signCmd = (keyPath, fileToSign, destination) => {
    if (!keyPath) {
        throw new Error('Path of the key is required.')
    }

    if (!fileToSign) {
        throw new Error('Path of file to sign is required.')
    }

    const key = readFileSync(keyPath, 'utf-8')
    const textToSign = readFileSync(fileToSign, 'utf-8')
    const signature = sign(key, textToSign)

    if (!destination) {
        console.log(signature)
    } else {
        writeFileSync(destination, signature)
        console.log('Signature file has been saved.')
    }
}

const verifyCmd = (keyPath, fileToVerify, signaturePath) => {
    if (!keyPath) {
        throw new Error('Path of the key is required.')
    }

    if (!fileToVerify) {
        throw new Error('Path of file to verify is required.')
    }

    if (!signaturePath) {
        throw new Error('Path of the signature is required.')
    }

    const key = readFileSync(keyPath, 'utf-8')
    const textToVerify = readFileSync(fileToVerify, 'utf-8')
    const signature = readFileSync(signaturePath, 'utf-8')
    const isVerified = verify(key, textToVerify, signature)

    const result = isVerified ? 'Verified OK' : 'Verified Failure'
    console.log(result)
}

module.exports = { generateKeysCmd, encryptCmd, decryptCmd, signCmd, verifyCmd }
