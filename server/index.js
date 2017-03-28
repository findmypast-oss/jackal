'use strict'

const express = require('express')
const bodyParser = require('body-parser')

const logging = require('./middleware/logging')
const jackal = require('./middleware/jackal')
const claude = require('./middleware/claude')
const crutch = require('./middleware/crutch')
const json = require('./middleware/json')

const app = express()

const startServer = (logger, done) => {
  const loggingMiddleware = logging(logger)

  app.use(loggingMiddleware)
  app.use(bodyParser.json())

  app.get('/health', function (req, res) { res.send('😊') })
  app.post('/api/contracts', json, jackal)
  app.get('/api/contracts/:provider', json, claude)
  app.get('/api/contracts', json, crutch)

  return app.listen(25863, done)
}

module.exports = startServer
