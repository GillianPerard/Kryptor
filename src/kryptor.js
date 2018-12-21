#!/bin/env node
const program = require('commander')

const { generateKeysCmd, encryptCmd, decryptCmd, signCmd, verifyCmd } = require('./commands.js')
const { returnStatus } = require('./utils')

// Program description
program
    .version('1.1.0', '-v, --version')
    .description('A CLI to generate RSA keys, encrypt and decrypt.')

// Add generate command to the program
program
    .command('generate <keySize>')
    .alias('g')
    .option('-e, --export <destFolder>', '[Required] Destination folder.')
    .action((keySize, cmd) => {
        return returnStatus(() => generateKeysCmd(keySize, cmd.export))
    })

// Add public encrypt command to the program
program
    .command('public-encrypt')
    .alias('pcet')
    .option('-p, --publicKey <path>', '[Required] Path of the public key.')
    .option('-f, --fileToEncrypt <path>', '[Required] Path of the file to encrypt.')
    .option('-e, --export <path>', '[Required] Path of the encrypted file.')
    .action(cmd => {
        return returnStatus(() => encryptCmd(cmd.publicKey, cmd.fileToEncrypt, cmd.export, true))
    })

// Add private decrypt command to the program
program
    .command('private-decrypt')
    .alias('pedt')
    .option('-p, --privateKey <path>', '[Required] Path of the private key.')
    .option('-f, --fileToDecrypt <path>', '[Required] Path of the encrypted file.')
    .option('-e, --export <path>', '[Required] Path of the decrypted file.')
    .action(cmd => {
        return returnStatus(() => decryptCmd(cmd.privateKey, cmd.fileToDecrypt, cmd.export, false))
    })

// Add private encrypt command to the program
program
    .command('private-encrypt')
    .alias('peet')
    .option('-p, --privateKey <path>', '[Required] Path of the private key.')
    .option('-f, --fileToEncrypt <path>', '[Required] Path of the file to encrypt.')
    .option('-e, --export <path>', '[Required] Path of the encrypted file.')
    .action(cmd => {
        return returnStatus(() => encryptCmd(cmd.privateKey, cmd.fileToEncrypt, cmd.export, false))
    })

// Add public decrypt command to the program
program
    .command('public-decrypt')
    .alias('pcdt')
    .option('-p, --publicKey <path>', '[Required] Path of the public key.')
    .option('-f, --fileToDecrypt <path>', '[Required] Path of the encrypted file.')
    .option('-e, --export <path>', '[Required] Path of the decrypted file.')
    .action(cmd => decryptCmd(cmd.publicKey, cmd.fileToDecrypt, cmd.export, true))

// Add sign command to the program
program
    .command('sign')
    .alias('s')
    .option('-p, --privateKey <path>', '[Required] Path of the private key.')
    .option('-f, --fileToSign <path>', '[Required] Path of the file to sign.')
    .option('-e, --export <path>', '[Required] Path of the signature.')
    .action(cmd => {
        return returnStatus(() => signCmd(cmd.privateKey, cmd.fileToSign, cmd.export))
    })

// Add verify command to the program
program
    .command('verify')
    .alias('v')
    .option('-p, --publicKey <path>', '[Required] Path of the public key.')
    .option('-f, --fileToVerify <path>', '[Required] Path of the file to verify.')
    .option('-s, --signature <path>', '[Required] Path of the signature.')
    .action(cmd => {
        return returnStatus(() => verifyCmd(cmd.publicKey, cmd.fileToVerify, cmd.signature))
    })

program.parse(process.argv)
