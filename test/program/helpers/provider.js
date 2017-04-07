'use strict'

const express = require('express')
const app = express()

var mockContract = { version: '1' }
var server = null
var hitCount = 0

app.get('/contract', function(req, res) {
  res.status(200).json(mockContract)
  hitCount++
})

const start = function(done) {
  hitCount = 0
  server = app.listen(5001, done)
}

const stop = function(done) {
  server.close(done)
}

const contractHitCount = function() {
  return hitCount
}

module.exports = {
  start,
  stop,
  contractHitCount
}
