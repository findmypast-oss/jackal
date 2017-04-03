'use strict'

const chai = require('chai')
const expect = chai.expect

const validateConsumer = require('./consumer')

describe('validateConsumer', function () {
  it('should validate a valid consumer', function () {
    const ok = { valid: true, error: null }
    expect(validateConsumer('neo4j_poc')).to.be.deep.equal(ok)
  })

  it('should fail to validate an invalid consumer', function () {
    const notOk = { valid: false, error: { name: 'ValidationError', message: '!"£&*^()*£" is invalid, \'consumer\' should be in format \'<consumer>\' where [a-z0-9_] are valid parameter characters' } }
    expect(validateConsumer('!"£&*^()*£"', 'consumer')).to.be.deep.equal(notOk)
  })
})
