'use strict'

const request = require('request')
const parser = require('./response-json')
const url = require('./jackal-url')

module.exports = (config, done) => {
  const jacky = url(config, '/api/stats')
  request(jacky, parser(done))
}
