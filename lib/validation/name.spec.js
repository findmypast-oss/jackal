'use strict'

const chai = require('chai')
const expect = chai.expect

const validateName = require('./name')

const notOk = { valid: false, error: { name: 'ValidationError', message: 'account-get_by_id is invalid, \'name\' should be in format \'<provider>/<apiName>\' where [a-z0-9_] are valid parameter characters' } }

describe('validateName', function () {
  it('should pass with valid provider and api', function () {
    const ok = { valid: true, error: null }
    expect(validateName('neo4j_poc/get_neo4j_stuff')).to.be.deep.equal(ok)
  })

  it('should fail when a "-" is used', function () {
    expect(validateName('account-get_by_id', 'name')).to.be.deep.equal(notOk)
  })

  it('should fail when a ">" is used', function () {
    notOk.error.message = 'account>get_by_id is invalid, \'name\' should be in format \'<provider>/<apiName>\' where [a-z0-9_] are valid parameter characters'
    expect(validateName('account>get_by_id', 'name')).to.be.deep.equal(notOk)
  })

  it('should fail when name does not follow <provider>/<api> pattern', function () {
    notOk.error.message = 'account_get_by_id is invalid, \'name\' should be in format \'<provider>/<apiName>\' where [a-z0-9_] are valid parameter characters'
    expect(validateName('account_get_by_id', 'name')).to.be.deep.equal(notOk)
  })

  it('should fail when multiple invalid characters are used', function () {
    notOk.error.message = 'inval!d_servic£/get_by_id! is invalid, \'name\' should be in format \'<provider>/<apiName>\' where [a-z0-9_] are valid parameter characters'
    expect(validateName('inval!d_servic£/get_by_id!', 'name')).to.be.deep.equal(notOk)
  })
})
