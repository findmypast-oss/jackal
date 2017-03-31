'use strict'

const express = require('express')
const bodyParser = require('body-parser')

const createLogger = require('../lib/logger')
const createGrapher = require('../lib/grapher')

const logging = require('./middleware/logging')
const graphing = require('./middleware/graphing')

const json = require('./middleware/json')

const createJackal = require('./middleware/jackal')
const createClaude = require('./middleware/claude')
const createCrutch = require('./middleware/crutch')
const stats = require('./middleware/stats')

const startServer = function (config, db, done) {
  const app = express()

  const logger = createLogger(config.logger)
  const grapher = createGrapher(config.statsD)

  const loggingMiddleware = logging(logger)
  const graphingMiddleware = graphing(grapher)

  const claude = createClaude(db)
  const crutch = createCrutch(db)
  const jackal = createJackal(db)

  app.use(loggingMiddleware)
  app.use(graphingMiddleware)

  app.use(bodyParser.json())

  app.get('/health', function (req, res) { res.send('😊') })
  app.post('/api/contracts', json, jackal)
  app.get('/api/contracts/:provider', json, claude)
  app.get('/api/contracts', json, crutch)
  app.get('/api/stats', json, stats)

  return app.listen(25863, done)
}

module.exports = startServer
