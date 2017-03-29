'use strict'

const { Contract, validateContracts } = require('consumer-contracts')
const mapContractHooks = require('./hooks').mapContractHooks

module.exports = (contracts, cb) => {
  const contractObjs = contracts.map(contract => {
    return new Contract(mapContractHooks(contract))
  })
  validateContracts(contractObjs, cb)
}
