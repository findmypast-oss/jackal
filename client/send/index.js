'use strict'

const fs = require('fs')
const request = require('request')
const parser = require('../response-parser')

const send = function (contractsPath, jackalUrl, quiet, done) {
  const buffer = fs.readFileSync(contractsPath)
  const headers = { 'Content-Type': 'application/json', 'Accept': 'application/json' }
  const req = { url: jackalUrl, method: 'POST', headers: headers, body: buffer }

  request(req, parser(201, quiet, done))
}

module.exports = send
