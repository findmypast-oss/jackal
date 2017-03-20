'use strict'

const logger = require('../../../lib/logger')
const expressPino = require('express-pino-logger')

module.exports = logger => expressPino({
  logger: logger
})
