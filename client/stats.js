'use strict'

const request = require('request')
const parser = require('./response-standard')

module.exports = (options, done) => {
  request(
    options.jackalUrl + '/api/stats',
    parser(done)
  )
}
