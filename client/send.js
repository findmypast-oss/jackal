'use strict'

const fs = require('fs')
const request = require('request')
const parser = require('./response-contract-results')
const url = require('./jackal-url')

module.exports = (contractsPath, options, done) => {
  const jacky = url(options, '/api/contracts')
  const buffer = fs.readFileSync(contractsPath)
  const req = {
    url: jacky,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: buffer
  }

  request(req, parser(done))
}
