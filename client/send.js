'use strict'

const fs = require('fs')
const yaml = require('js-yaml')
const request = require('request')
const parser = require('./response-contract-results')
const url = require('./jackal-url')

module.exports = (contractsPath, options, done) => {
  const jacky = url(options, '/api/contracts')
  const fileBuffer = fs.readFileSync(contractsPath)

  let bodyBuffer
  if (contractsPath.endsWith('json')) {
    bodyBuffer = fileBuffer
  } else {
    const contracts = yaml.safeLoad(fileBuffer.toString())
    const json = JSON.stringify(contracts)
    bodyBuffer = Buffer.from(json)
  }

  const req = {
    url: jacky,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: bodyBuffer
  }

  request(req, parser(done))
}
