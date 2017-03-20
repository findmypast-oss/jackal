'use strict'

const express = require('express')
const bodyParser = require('body-parser')

const logging = require('./middleware/logging')
const jackal = require('./middleware/jackal')
const claude = require('./middleware/claude')
const crutch = require('./middleware/crutch')

const app = express()

const startServer = logger => {
  const loggingMiddleware = logging(logger)

  app.use(loggingMiddleware)
  app.use(bodyParser.json())

  app.get('/health', function (req, res) { res.send('😊') })
  app.post('/api/contracts', jackal)
  app.get('/api/contracts/:provider', claude)
  app.get('/api/contracts', crutch)

  app.listen(25863)
}

module.exports = startServer
