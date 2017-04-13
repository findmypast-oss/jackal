'use strict'

const readContract = require('./read-contract')
const request = require('request')
const handleResponse = require('./handle-response')
const url = require('./jackal-url')

module.exports = (jackalUrl, contractsPath, options, done) => {
  const jackal = url(jackalUrl, '/api/contracts')

  if(readContract.exitOnMissingContract(contractsPath, options.skipMissingContract)){
    const body = {
      message: `Skipping no contracts, file not found: ${contractsPath}`,
      status: 'SKIPPED',
      results: []
    }

    return done(null, null, body)
  }

  if (readContract.contractExists(contractsPath)) {
    return done(`Missing contract file ${contractsPath}`)
  }

  const bodyBuffer = readContract.readContents(contractsPath)

  const req = {
    url: jackal,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: bodyBuffer
  }

  request(req, handleResponse(done))
}
