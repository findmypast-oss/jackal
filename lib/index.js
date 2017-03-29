'use strict'

const createLogger = require('./logger')
const createGrapher = require('./grapher')
const startServer = require('../server')

const startJackal = function (config, done) {
  const logger = createLogger(config.logger)
  const grapher = createGrapher(config.statsD)

  return startServer(logger, grapher, done)
}

module.exports = startJackal
