'use strict'

const request = require('request')
const contractExists = require('./contracts-io/contract-exists')
const handleMissingContracts = require('./handle-missing-contracts')
const readContracts = require('./contracts-io/read-contracts')
const handleResponse = require('./handle-response')
const url = require('./jackal-url')
const zlib = require('zlib')

module.exports = (jackalUrl, contractsPath, options, done) => {
  const jackal = url(jackalUrl, '/api/contracts')

  if (!contractExists(contractsPath)) {
    return handleMissingContracts(contractsPath, options, done)
  }

  const contracts = readContracts(contractsPath)
  const serialisedContracts = JSON.stringify(contracts)
  const buf = Buffer.from(serialisedContracts)
  const body = zlib.gzipSync(buf)

  const headers = {
    'Content-Type': 'application/json',
    'Content-Encoding': 'gzip'
  }

  const req = {
    url: jackal,
    method: 'POST',
    headers: headers,
    body: body
  }

  request(req, handleResponse(done))
}
