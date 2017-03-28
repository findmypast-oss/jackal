'use strict'

const createLogger = require('./logger')
const startServer = require('../server')

const startJackal = (config, done) => {
  const logger = createLogger(config.logger)

  return startServer(logger, done)
}

module.exports = startJackal
