'use strict'

const fs = require('fs')
const request = require('request')
const parser = require('./response-contract-results')

module.exports = (options, done) => {
  const buffer = fs.readFileSync(options.contractsPath)
  const req = {
    url: options.jackalUrl,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: buffer
  }

  request(req, parser(done))
}
