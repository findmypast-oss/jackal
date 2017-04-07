'use strict'

const hashData = require('./hash-data')

describe('hashData', function () {
  const contract = {
    name: 'name',
    consumer: 'api | provider',
    request: { url: 'http://www.google.com' },
    response: { statusCode: 200 }
  }

  it('should throw when passed something other than a buffer or a string', function () {
    expect(function () { hashData(contract) }).to.throw(Error)
  })

  it('should hash data consistently', function () {
    const input = JSON.stringify(contract)
    const expected = 'fb4302ded76faefcf77becf4ce98753072c865e7323b8bf653752f08f733ecb9'
    expect(hashData(input)).to.be.equal(expected)
    expect(hashData(input)).to.be.equal(expected)
  })
})
