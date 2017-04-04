'use strict'

const request = require('request')
const parser = require('./response-standard')

function stats(options, done) {
  request(
    options.jackalUrl + '/api/stats',
    parser(done)
  )
}

module.exports = stats
