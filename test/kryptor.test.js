const { execSync } = require('child_process')
const { existsSync } = require('fs')
const { expect } = require('chai')
const del = require('del')

const licenseExamplePath = './examples/license.json'
const publicKeyPath = './test/public.pem'
const privateKeyPath = './test/private.pem'
const publicEncryptedLicensePath = './test/public-license.enc'
const privateEncryptedLicensePath = './test/private-license.enc'
const publicDecryptedLicensePath = './test/public-license.json'
const privateDecryptedLicensePath = './test/private-license.json'

describe("Test kryptor.js", () => {
    it("Generate keys", () => {
        execSync('node ./src/kryptor.js g 1024 -e ./test')
        const publicKeyExists = existsSync(publicKeyPath)
        const privateKeyExists = existsSync(privateKeyPath)
        expect(publicKeyExists).to.be.true
        expect(privateKeyExists).to.be.true
    });

    it('Public encrypt', () => {
        execSync(`node ./src/kryptor.js pcet -p ${publicKeyPath} -f ${licenseExamplePath} -e ${publicEncryptedLicensePath}`)
        const encryptedFileExists = existsSync(publicEncryptedLicensePath)
        expect(encryptedFileExists).to.be.true
    })

    it('Private encrypt', () => {
        execSync(`node ./src/kryptor.js peet -p ${privateKeyPath} -f ${licenseExamplePath} -e ${privateEncryptedLicensePath}`)
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
});

after(() => del.sync(['./test/*.pem', './test/*.enc', './test/*.json']))