'use strict'

const express = require('express')
const bodyParser = require('body-parser')

const logging = require('./middleware/logging')
const graphing = require('./middleware/graphing')

const jackal = require('./middleware/jackal')
const claude = require('./middleware/claude')
const crutch = require('./middleware/crutch')
const json = require('./middleware/json')

const app = express()

const startServer = function (logger, grapher) {
  if (process.env.NODE_ENV === 'production') {
    const loggingMiddleware = logging(logger)
    const graphingMiddleware = graphing(grapher)

    app.use(loggingMiddleware)
    app.use(graphingMiddleware)
  }

  app.use(bodyParser.json())

  app.get('/health', function (req, res) { res.send('😊') })
  app.post('/api/contracts', json, jackal)
  app.get('/api/contracts/:provider', json, claude)
  app.get('/api/contracts', json, crutch)

  return app.listen(25863)
}

module.exports = startServer
