'use strict'

const Contract = require('.')
const validateContracts = require('./validate')
const mapContractHooks = require('./map-contract-hooks')

module.exports = (contracts, cb) => {
  const contractObjects = contracts.map(parseContracts)
  validateContracts(contractObjects, cb)
}

const parseContracts = (contract) => {
  const mappedContract = mapContractHooks(contract)
  return new Contract(mappedContract)
}
