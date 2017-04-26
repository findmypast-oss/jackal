'use strict'

const consumerContracts = require('consumer-contracts')
const mapContractHooks = require('./map-contract-hooks')

const Contract = consumerContracts.Contract
const validateContracts = consumerContracts.validateContracts

module.exports = (contracts, cb) => {
  const contractObjects = contracts.map(parseContracts)
  validateContracts(contractObjects, cb)
}

const parseContracts = (contract) => {
  const mappedContract = mapContractHooks(contract)
  return new Contract(mappedContract)
}
