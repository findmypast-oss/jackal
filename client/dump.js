'use strict'

const request = require('request')
const parser = require('./response-standard')
const url = require('./jackal-url')

module.exports = (jackalUrl, options, done) => {
  const jacky = url(jackalUrl, '/api/db')
  request(jacky, parser(done))
}
