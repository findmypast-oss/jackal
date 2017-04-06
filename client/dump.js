'use strict'

const request = require('request')
const parser = require('./response-standard')
const url = require('./jackal-url')

module.exports = (config, done) => {
  const jacky = url(config, '/api/contracts')
  request(jacky, parser(done))
}
