const Promise = require('bluebird')
const express = require('express')
const app = express()
var testData = null
var server = null

app.get('/contract', function(req, res) {
  res.status(200)
    .json(testData)
})

const start = (done) => {
  server = app.listen(5000, done)
}

const stop = (done) => {
  server.close(done)
}

module.exports = {
  start: Promise.promisify(start),
  stop: Promise.promisify(stop),
  setContractResponse: data => testData = data
}
