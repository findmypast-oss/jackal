'use strict'

const createLogger = require('./create-logger')

describe('createLogger', function () {
  describe('with default config', function () {
    it('should return a logger with the default config', function () {
      const logger = createLogger()
      expect(logger.name).to.be.equal('jackal')
      expect(logger.chindings).to.include(',"environment":"dev"')
    })
  })

  describe('with custom config', function () {
    it('should return a logger with the provided custom config', function () {
      const customConfig = { environment: 'environment' }
      const logger = createLogger(customConfig)
      expect(logger.name).to.be.equal('jackal')
      expect(logger.chindings).to.include(',"environment":"environment"')
    })
  })
})
