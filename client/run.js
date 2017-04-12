'use strict'

const request = require('request')
const handleResponse = require('./handle-response')
const url = require('./jackal-url')

module.exports = (jackalUrl, providerName, options, done) => {
  const query = options.providerUrl ? `?testUrl=${options.providerUrl}` : ''
  const jacky = url(jackalUrl, `/api/contracts/${providerName}${query}`)
  request(jacky, handleResponse(done))
}
