'use strict'

const fs = require('fs')
const request = require('request')

const send = function (contractsPath, jackalUrl, cb) {

  const buffer = fs.readFileSync(contractsPath)
  const headers = { 'Content-Type': 'application/json', 'Accept': 'application/json' }
  const req = { url: jackalUrl, method: 'POST', headers: headers, body: buffer }

  request(req, cb)
}

module.exports = send
