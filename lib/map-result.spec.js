'use strict'

const chai = require('chai')
const expect = chai.expect

const mapResult = require('./map-result')

describe('mapResult', function () {
  const base = { name: 'name', consumer: 'consumer' }
  const input = { contract: base }

  it('should map failures correctly', function () {
    const failed = Object.assign({}, input, { err: 'Error' })
    const expected = Object.assign({}, base, { status: 'Fail', error: 'Error' })
    expect(mapResult(failed)).to.be.deep.equal(expected)
  })

  it('should map successes correctly', function () {
    const passed = Object.assign({}, input, { err: null })
    const expected = Object.assign({}, base, { status: 'Pass', error: null })
    expect(mapResult(passed)).to.be.deep.equal(expected)
  })
})
