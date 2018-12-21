const { expect } = require('chai')
const { describe, it } = require('mocha')

const { returnStatus, toFirstLetterUppercase } = require('../src/utils')

describe('Test utils.js', () => {
    it('Make uppercase the first letter of a text', () => {
        const tests = [
            { text: 'gillian', result: 'Gillian' },
            { text: 'my name is Gillian', result: 'My name is Gillian' },
            { text: '-gillian', result: '-gillian' },
            { text: '.gillian', result: '.gillian' },
            { text: 'Gillian', result: 'Gillian' },
            { text: '42', result: '42' },
            { text: 'g', result: 'G' },
            { text: '', result: '' },
            { text: 42, result: 42 },
            { text: undefined, result: undefined },
            { text: null, result: null }
        ]

        tests.forEach(test => {
            expect(toFirstLetterUppercase(test.text)).to.be.equal(test.result)
        })
    })

    it('Return status code 0 if no error', () => {
        const status = returnStatus(() => 'Gillian'.charAt(0))
        expect(status).to.be.equal(0)
    })

    it('Return status code -1 throw error', () => {
        const text = undefined

        // Disable that the console prints the error returned
        console.log = () => { }

        const status = returnStatus(() => text.charAt(0))
        expect(status).to.be.equal(-1)
    })
})
