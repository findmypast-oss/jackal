'use strict'

const fs = require('fs')
const request = require('request')
const parser = require('./contract-results-parser')

function send(options, done) {
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

module.exports = send
