'use strict'

const mapContractObjectToArray = require('../../../lib/map-contract-object-to-array')
const parseContract = require('../../../lib/contract/parse')
const isMalformed = require('../../../lib/errors/is-malformed')

const validateMalformedContract = (req, res, next) => {
  const contracts = req.body

  const parsedContracts = mapContractObjectToArray(contracts, parseContract)
  const malformedContracts = parsedContracts.filter(filterMalformed)

  if (malformedContracts.length > 0) {
    const malformedResponse = {
      message: 'One or more contracts are invalid',
      status: 'INVALID',
      results: malformedContracts.map(mapMalformed)
    }

    res.status(400).send(malformedResponse)
  } else {
    next()
  }
}

module.exports = validateMalformedContract

const filterMalformed = (contract) => {
  if (contract.response.body) { return isMalformed(contract.response.body) }

  return false
}

const mapMalformed = (contract) => {
  return {
    contract: `${contract.name} <- ${contract.consumer}`,
    valid: false,
    errors: [ contract.response.body ]
  }
}
