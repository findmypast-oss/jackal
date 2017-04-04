'use strict'

const request = require('request')
const parser = require('./response-standard')

function dump(options, done) {
  request(
    options.jackalUrl + '/api/contracts',
    parser(done)
  )
}

module.exports = dump
