'use strict'

const DB = require('../lib/db')
const configReader = require('../lib/config')
const express = require('express')
const createLogger = require('../lib/create-logger')
const createGrapher = require('../lib/create-grapher')

const json = require('./middleware/json')
const logging = require('./middleware/logging')
const graphing = require('./middleware/graphing')
const bodyParser = require('body-parser')
const buildDumpMiddleware = require('./middleware/dump/build')
const buildConsumerMiddleware = require('./middleware/consumer/build')
const buildProviderMiddleware = require('./middleware/provider/build')
const buildStatsMiddleware = require('./middleware/stats/build')

let db

const startServer = (options, done) => {
  const config = configReader(options)
  const app = express()

  db = new DB(config.db)

  const logger = createLogger(config.logger)

  if (!config.quiet) {
    app.use(logging(logger))
    app.use(graphing(createGrapher(config.statsD)))
  }

  const dumpMiddleware = buildDumpMiddleware(db, json)
  const consumerMiddleware = buildConsumerMiddleware(db, json)
  const providerMiddleware = buildProviderMiddleware(db, json)
  const statsMiddleware = buildStatsMiddleware(db, json)

  app.use(bodyParser.json())

  app.get('/health', (req, res) => { res.send('😊') })
  app.post('/api/contracts', consumerMiddleware)
  app.get('/api/contracts/:provider', providerMiddleware)
  app.get('/api/contracts', dumpMiddleware)
  app.get('/api/stats', statsMiddleware)

  return app.listen(config.jackal.port, (err) => {
    if(err) {
      logger.error(err)
      if(done) return done(err)
    }
    if (!config.quiet) logger.info(`Starting server on port ${config.jackal.port}`)
    if(done) done()
  })
}

module.exports = startServer
