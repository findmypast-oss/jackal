'use strict'

const Contract = require('.')
const validateContracts = require('./validate')

module.exports = (contracts, cb) => {
  const contractObjects = contracts.map(contract => new Contract(contract))
  validateContracts(contractObjects, cb)
}
