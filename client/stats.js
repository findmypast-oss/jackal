'use strict'

const request = require('request')
const handleResponse = require('./handle-response')
const url = require('./jackal-url')

module.exports = (jackalUrl, options, done) => {
  const jacky = url(jackalUrl, '/api/stats')
  let query = ''

  if (options.consumer) {
    query = `?consumer=${options.consumer}`
  }

  if (options.provider) {
    const providerQuery = `provider=${options.provider}`
    query = query === ''
      ? `?${providerQuery}`
      : `${query}&${providerQuery}`
  }

  request(`${jacky}${query}`, handleResponse(done))
}
