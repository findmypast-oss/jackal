'use strict'

const parseContract = require('../../../lib/parse-contract')
const isMalformed = require('../../../lib/is-malformed')
const flattenDeep = require('lodash/flattenDeep')

const validateMalformedContract = (req, res, next) => {
  const contracts = req.body

  const parsedContracts = parseContracts(contracts)
  const malformedContract = parsedContracts.find(findMalformed)

  if (malformedContract) {
    res.status(400).send(malformedContract.response.body)
  } else {
    next()
  }
}

module.exports = validateMalformedContract

const findMalformed = (contract) => isMalformed(contract.response.body)

const parseContracts = (contracts) => {
  const consumer = Object.keys(contracts)[0]
  const providers = Object.values(contracts[consumer])
  const nestedContracts = providers.map((provider) => {
    const apis = Object.values(provider)

    return apis.map((api) => {
      const scenarios = Object.values(api)

      return scenarios.map(parseContract)
    })
  })

  return flattenDeep(nestedContracts)
}
