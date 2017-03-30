'use strict'

const chai = require('chai')
const expect = chai.expect

const createGrapher = require('.')

describe('createGrapher', function () {
  describe('with default config', function () {
    it('should return a grapher with the default config', function () {
      const grapher = createGrapher()
      expect(grapher.host).to.be.equal('localhost')
      expect(grapher.port).to.be.equal(8125)
      expect(grapher.prefix).to.be.equal('jackal.')
    })
  })

  describe('with custom config', function () {
    it('should return a grapher with the provided custom config', function () {
      const customConfig = { host: 'host', port: 1234, prefix: 'prefix' }
      const grapher = createGrapher(customConfig)
      expect(grapher.host).to.be.equal('host')
      expect(grapher.port).to.be.equal(1234)
      expect(grapher.prefix).to.be.equal('prefix')
    })
  })
})
