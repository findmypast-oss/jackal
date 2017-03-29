'use strict'

const logger = require('../../../lib/logger')
const expressPino = require('express-pino-logger')

module.exports = function (logger) { return expressPino({ logger: logger }) }
