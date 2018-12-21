const { execSync } = require('child_process')
const { existsSync } = require('fs')
const { expect } = require('chai')
const { after, describe, it } = require('mocha')
const del = require('del')

const IS_VERIFIED = 'Verified OK'
const IS_FORGED = 'Verified Failure'

const forgedLicensePath = './examples/forged-license.json'
const licensePath = './examples/license.json'
const licenseSignaturePath = './test/license.sign'
const privateDecryptedLicensePath = './test/private-license.json'
const privateEncryptedLicensePath = './test/private-license.enc'
const privateKeyPath = './test/private.pem'
const publicDecryptedLicensePath = './test/public-license.json'
const publicEncryptedLicensePath = './test/public-license.enc'
const publicKeyPath = './test/public.pem'

describe('Test kryptor.js', () => {
    it('Generate keys', () => {
        execSync('node ./src/kryptor.js g 1024 -e ./test')
        const publicKeyExists = existsSync(publicKeyPath)
        const privateKeyExists = existsSync(privateKeyPath)
        expect(publicKeyExists).to.be.true
        expect(privateKeyExists).to.be.true
    })

    it('Public encrypt', () => {
        execSync(`node ./src/kryptor.js pcet -p ${publicKeyPath} -f ${licensePath} -e ${publicEncryptedLicensePath}`)
        const encryptedFileExists = existsSync(publicEncryptedLicensePath)
        expect(encryptedFileExists).to.be.true
    })

    it('Private encrypt', () => {
        execSync(`node ./src/kryptor.js peet -p ${privateKeyPath} -f ${licensePath} -e ${privateEncryptedLicensePath}`)
        const encryptedFileExists = existsSync(privateEncryptedLicensePath)
        expect(encryptedFileExists).to.be.true
    })

    it('Public decrypt', () => {
        execSync(`node ./src/kryptor.js pcdt -p ${publicKeyPath} -f ${privateEncryptedLicensePath} -e ${publicDecryptedLicensePath}`)
        const decryptedFileExists = existsSync(publicDecryptedLicensePath)
        expect(decryptedFileExists).to.be.true
    })

    it('Private decrypt', () => {
        execSync(`node ./src/kryptor.js pedt -p ${privateKeyPath} -f ${publicEncryptedLicensePath} -e ${privateDecryptedLicensePath}`)
        const decryptedFileExists = existsSync(privateDecryptedLicensePath)
        expect(decryptedFileExists).to.be.true
    })

    it('Sign', () => {
        execSync(`node ./src/kryptor.js s -p ${privateKeyPath} -f ${licensePath} -e ${licenseSignaturePath}`)
        const signatureExists = existsSync(licenseSignaturePath)
        expect(signatureExists).to.be.true
    })

    it('Verify: true', () => {
        let result = execSync(`node ./src/kryptor.js v -p ${publicKeyPath} -f ${licensePath} -s ${licenseSignaturePath}`)
        result = removeBreakLines(result.toString())
        expect(result.toString()).to.be.equal(IS_VERIFIED)
    })

    it('Verify: false', () => {
        let result = execSync(`node ./src/kryptor.js v -p ${publicKeyPath} -f ${forgedLicensePath} -s ${licenseSignaturePath}`)
        result = removeBreakLines(result.toString())
        expect(result.toString()).to.be.equal(IS_FORGED)
    })
})

after(() => del.sync(['./test/*.pem', './test/*.enc', './test/*.json', './test/*.sign']))

const removeBreakLines = text => text.replace(/\n/gm, '')
