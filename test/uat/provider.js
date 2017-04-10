'use strict'

const express = require('express')
const app = express()
var server = null

app.get('/contract', function(req, res) {
  res.status(200).json({
    version: 1
  })
})

const start = function(done) {
  server = app.listen(5000, done)
}

module.exports = { start }
