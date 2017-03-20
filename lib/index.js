'use strict'

const createLogger = require('./logger')
const startServer = require('../server')

const startJackal = config => {
  const logger = createLogger(config.logger)

  startServer(logger)
}

module.exports = startJackal
