'use strict'

const DB = require('../lib/db')
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

let db

const startServer = (config, done) => {
  const app = express()

  db = new DB(config.db)

  if (!config.quiet) {
    app.use(logging(createLogger(config.logger)))
    app.use(graphing(createGrapher(config.statsD)))
  }

  const dumpMiddleware = buildDumpMiddleware(db, json)
  const consumerMiddleware = buildConsumerMiddleware(db, json)
  const providerMiddleware = buildProviderMiddleware(db, json)

  app.use(bodyParser.json())

  app.get('/health', (req, res) => { res.send('😊') })
  app.post('/api/contracts', consumerMiddleware)
  app.get('/api/contracts/:provider', providerMiddleware)
  app.get('/api/contracts', dumpMiddleware)

  return app.listen(25863, done)
}

module.exports = startServer
