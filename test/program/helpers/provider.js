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

const start = (port) => (done) => {
  hitCount = 0
  server = app.listen(port, done)
}

const stop = (done) => {
  server.close(done)
}

const contractHitCount = () => {
  return hitCount
}

module.exports = {
  start,
  stop,
  contractHitCount
}
