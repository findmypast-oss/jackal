'use strict'

const Contract = require('./contract')
const validateContracts = require('./contract/validate')

module.exports = (contracts, cb) => {
  const contractObjects = contracts.map(contract => new Contract(contract))
  validateContracts(contractObjects, cb)
}
