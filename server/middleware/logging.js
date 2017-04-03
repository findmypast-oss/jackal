'use strict'

const expressPino = require('express-pino-logger')

module.exports = (logger) => expressPino({ logger: logger })
