'use strict'

const express = require('express')
const app = express()

var mockContract = null
var server = null
var hitCount = 0

app.get('/contract', function(req, res) {
  
  res.status(200).json(mockContract)
  hitCount++
})

const start = function(options, done) {
  hitCount = 0
  mockContract = options.contract
  server = app.listen(options.port, done)
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
