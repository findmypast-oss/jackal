'use strict'

const express = require('express')

const app = express()

const startProvider = function (version) {
  app.get('/', function (req, res) { res.send({ version: version }) })

  return app.listen(12345)
}

module.exports = startProvider
