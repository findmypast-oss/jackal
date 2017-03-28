const Promise = require('bluebird')
const express = require('express')
const app = express()
var mockContract = null
var server = null

app.get('/contract', function(req, res) {
  res.status(200)
    .json(mockContract)
})

const start = ({port, contract}, done) => {
  mockContract = contract
  server = app.listen(port, done)
}

const stop = (done) => {
  server.close(done)
}

module.exports = {
  start: Promise.promisify(start),
  stop: Promise.promisify(stop)
}
