'use strict'

const express = require('express')
const bodyParser = require('body-parser')

const DB = require('../lib/db')
const createLogger = require('../lib/logger')
const createGrapher = require('../lib/grapher')

/* Used by All */
const json = require('./middleware/json')
const logging = require('./middleware/logging')
const graphing = require('./middleware/graphing')

/* DB */
const createDbInsert = require('./middleware/db/insert')
const createDbConsistencyCheck = require('./middleware/db/consistency-check')

/* Validators */
const validateNoContracts = require('./middleware/validation/no-contracts')
const validateContracts = require('./middleware/validation/contracts')
const validateMalformedContract = require('./middleware/validation/malformed-contract')
const validateUnsupportedContract = require('./middleware/validation/unsupported-contract')

/* Executors */
const executeConsumer = require('./middleware/consumer/execute')




const createClaude = require('./middleware/claude')
const createCrutch = require('./middleware/crutch')
const stats = require('./middleware/stats')



let db

const startServer = function (config, done) {
  const app = express()

  db = new DB(config.db)

  if (!config.quiet) {
    const logger = createLogger(config.logger)
    const grapher = createGrapher(config.statsD)

    const loggingMiddleware = logging(logger)
    const graphingMiddleware = graphing(grapher)

    app.use(loggingMiddleware)
    app.use(graphingMiddleware)
  }

  /* DB */
  const dbInsert = createDbInsert(db)
  const dbConsistencyCheck = createDbConsistencyCheck(db)

  /* Consumer */
  const consumerMiddleware = [
    validateNoContracts,
    validateContracts,
    validateMalformedContract,
    validateUnsupportedContract,
    dbInsert,
    dbConsistencyCheck,
    executeConsumer
  ]

  /* Executors */
  const claude = createClaude(db)
  const crutch = createCrutch(db)

  app.use(bodyParser.json())

  app.get('/health', function (req, res) { res.send('😊') })
  app.post('/api/contracts', consumerMiddleware)
  app.get('/api/contracts/:provider', json, claude)
  app.get('/api/contracts', json, crutch)
  app.get('/api/stats', json, stats)

  return app.listen(25863, done)
}

module.exports = startServer
