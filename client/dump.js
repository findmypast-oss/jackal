'use strict'

const request = require('request')
const handleResponse = require('./handle-response')
const url = require('./jackal-url')

module.exports = (jackalUrl, options, done) => {
  const jacky = url(jackalUrl, '/api/db')
  request(jacky, handleResponse(done))
}
