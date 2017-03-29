'use strict'

const createLogger = require('./logger')
const createGrapher = require('./grapher')
const startServer = require('../server')

const startJackal = config => {
  const logger = createLogger(config.logger)
  const grapher = createGrapher(config.statsD)

  startServer(logger, grapher)
}

module.exports = startJackal
