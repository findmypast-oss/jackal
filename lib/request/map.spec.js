'use strict'

const mapRequest = require('./map')

describe('mapRequest', function () {
  describe('parsed requests gets populated', function () {
    let request = {}
    let testUrl = 'http://www.test.com';
    
    it('should populate rejectUnauthorized with true when not provided', function () {
      request = {}
      const parsedRequest = mapRequest(request, testUrl)
      expect(parsedRequest.rejectUnauthorized).to.be.equal(true)
    })

    it('should populate rejectUnauthorized with true when set to true', function () {
      request.rejectUnauthorized = true
      const parsedRequest = mapRequest(request, testUrl)
      expect(parsedRequest.rejectUnauthorized).to.be.equal(true)
    })

    it('should populate rejectUnauthorized with false when set to false', function () {
      request.rejectUnauthorized = false
      const parsedRequest = mapRequest(request, testUrl)
      expect(parsedRequest.rejectUnauthorized).to.be.equal(false)
    })
  })

})
