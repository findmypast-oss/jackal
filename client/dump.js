'use strict'

const request = require('request')
const parser = require('./response-standard')
const url = require('./jackal-url')

module.exports = (jackalUrl, done) => {
  const jacky = url(jackalUrl, '/api/contracts')
  request(jacky, parser(done))
}
