'use strict'

const consumerContracts = require('consumer-contracts')

const Contract = consumerContracts.Contract
const validateContracts = consumerContracts.validateContracts

module.exports = function (contracts, cb) {
  const contractObjs = contracts.map(mapContract)
  validateContracts(contractObjs, cb)
}

const mapContract = function (contract) { return new Contract(contract) }
