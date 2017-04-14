'use strict'

const request = require('request')
const contractExists = require('./contracts-io/contract-exists')
const handleMissingContracts = require('./handle-missing-contracts')
const readContracts = require('./contracts-io/read-contracts')
const handleResponse = require('./handle-response')
const url = require('./jackal-url')

module.exports = (jackalUrl, contractsPath, options, done) => {
  const jackal = url(jackalUrl, '/api/contracts')

  if (!contractExists(contractsPath)) {
    return handleMissingContracts(contractsPath, options, done)
  }

  const contracts = readContracts(contractsPath)

  const req = {
    url: jackal,
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(contracts)
  }

  request(req, handleResponse(done))
}
