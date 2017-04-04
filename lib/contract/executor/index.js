'use strict'

const consumerContracts = require('consumer-contracts')
const mapContractHooks = require('./hooks')

const Contract = consumerContracts.Contract
const validateContracts = consumerContracts.validateContracts

module.exports = function (contracts, cb) {
  const contractObjects = contracts.map(parseContracts)
  validateContracts(contractObjects, cb)
}

const parseContracts = (contract) => {
  const mappedContract = mapContractHooks(contract)
  return new Contract(mappedContract)
}
