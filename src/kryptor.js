#!/bin/env node
const program = require('commander')
const { readFileSync, writeFileSync } = require('fs')
const { join } = require('path')
const { generateKeys, encrypt, decrypt } = require('./rsa')

const PUBLIC_KEY_FILE_NAME = 'public.pem'
const PRIVATE_KEY_FILE_NAME = 'private.pem'

// Generate command
const generateCmd = destFolder => {
    const { publicKey, privateKey } = generateKeys()

    destFolder = destFolder !== undefined ? destFolder : process.cwd()
    const publicKeyPath = join(destFolder, PUBLIC_KEY_FILE_NAME)
    const privateKeyPath = join(destFolder, PRIVATE_KEY_FILE_NAME)

    writeFileSync(publicKeyPath, publicKey)
    console.log('Public key has been saved.')

    writeFileSync(privateKeyPath, privateKey)
    console.log('Private key has been saved.')
}

// Encrypt command
const encryptCmd = (privateKeyPath, fileToEncrypt, destination) => {
    if (!privateKeyPath)
        throw new Error('Path of private key is required.')

    if (!fileToEncrypt)
        throw new Error('Path of file to encrypt is required.')

    const privateKey = readFileSync(privateKeyPath, 'utf-8')
    const textToEncrypt = readFileSync(fileToEncrypt)

    const encrypted = encrypt(privateKey, textToEncrypt)
    writeFileSync(destination, encrypted)
    console.log('Encrypted file has been saved.')
}

// Encrypt command
const decryptCmd = (publicKeyPath, fileToDecrypt) => {
    if (!publicKeyPath)
        throw new Error('Path of public key is required.')

    const publicKey = readFileSync(publicKeyPath, 'utf-8')
    const textToDecrypt = readFileSync(fileToDecrypt, 'utf-8')
    const bufferToDecrypt = Buffer.from(textToDecrypt, 'hex')
    const decrypted = decrypt(publicKey, bufferToDecrypt)
    console.log(decrypted)
}

// Program description
program
    .version('1.0.0', '-v, --version')
    .description('A CLI to generate RSA keys, encrypt and decrypt.')

// Add generate command to the program
program
    .command('generate')
    .alias('g')
    .option('-d, --destFolder <dest>', '[Required] Destination folder.')
    .action(cmd => generateCmd(cmd.destFolder))

// Add encrypt command to the program
program
    .command('encrypt')
    .alias('e')
    .option('-p, --privateKey <path>', '[Required] Path of the private key.')
    .option('-f, --fileToEncrypt <path>', '[Required] Path of the file to encrypt.')
    .option('-d, --destination <path>', '[Required] Path of the encrypted file.')
    .action(cmd => encryptCmd(cmd.privateKey, cmd.fileToEncrypt, cmd.destination))

// Add encrypt command to the program
program
    .command('decrypt')
    .alias('d')
    .option('-p, --publicKey <path>', '[Required] Path of the public key.')
    .option('-f, --fileToDecrypt <path>', '[Required] Path of the encrypted file.')
    .action(cmd => decryptCmd(cmd.publicKey, cmd.fileToDecrypt))

program.parse(process.argv)
