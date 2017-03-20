'use strict'

const { Contract, validateContracts } = require('consumer-contracts')

module.exports = (contracts, cb) => {
  const contractObjs = contracts.map(contract => new Contract(contract))
  validateContracts(contractObjs, cb)
}
