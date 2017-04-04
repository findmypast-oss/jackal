'use strict'

const mapContractObjectToArray = require('../../../lib/map-contract-object')
const parseContract = require('../../../lib/parse-contract')
const isMalformed = require('../../../lib/is-malformed')

const flattenDeep = require('lodash/flattenDeep')
const map = require('lodash.map')

const validateMalformedContract = (req, res, next) => {
  const contracts = req.body

  const parsedContracts = mapContractObjectToArray(contracts, parseContract)
  const malformedContract = parsedContracts.find(findMalformed)

  if (malformedContract) {
    res.status(400).send(malformedContract.response.body)
  } else {
    next()
  }
}

module.exports = validateMalformedContract

const findMalformed = (contract) => isMalformed(contract.response.body)
