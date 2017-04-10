'use strict'

const express = require('express')
const app = express()

var mockContract = null
var server = null
var hitCounts = null

app.get('/contract', function(req, res) {
  res.status(200).json(mockContract)
  hitCounts.contract++
})

app.get('/contract-a', function(req, res) {
  res.status(200).json(mockContract)
  hitCounts.contractA++
})

app.get('/contract-b', function(req, res) {
  res.status(200).json(mockContract)
  hitCounts.contractB++
})

app.get('/contract-c', function(req, res) {
  res.status(200).json(mockContract)
  hitCounts.contractC++
})

const start = function(options, done) {
  hitCounts = {
    contract: 0,
    contractA: 0,
    contractB: 0,
    contractC: 0,
  }
  mockContract = options.contract
  server = app.listen(options.port, done)
}

const stop = function(done) {
  server.close(done)
}

const contractHitCount = function() {
  return hitCounts
}

module.exports = {
  start,
  stop,
  contractHitCount
}
