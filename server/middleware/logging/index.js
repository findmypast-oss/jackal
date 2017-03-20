'use strict'

const expressPino = require('express-pino-logger')
const logger = require('../../../lib/logger')

module.exports = expressPino({
  logger: logger
})
