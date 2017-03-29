'use strict'

const consumerContracts = require('consumer-contracts')
const mapContractHooks = require('./hooks')

const Contract = consumerContracts.Contract
const validateContracts = consumerContracts.validateContracts

module.exports = function (contracts, cb) {
  const contractObjs = contracts.map(function (contract) {
    return new Contract(mapContractHooks(contract))
  })
  
  validateContracts(contractObjs, cb)
}
