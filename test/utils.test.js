const { expect } = require('chai')
const { describe, it } = require('mocha')

const { toFirstLetterUppercase } = require('../src/utils')

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
})
