'use strict'

const parseContract = require('../../../lib/parse-contract')
const isUnsupported = require('../../../lib/is-unsupported')
const flattenDeep = require('lodash/flattenDeep')

const validateUnsupportedContract = (req, res, next) => {
  const contracts = req.body

  const parsedContracts = parseContracts(contracts)
  const unsupportedContract = parsedContracts.find(findUnsupported)

  if (unsupportedContract) {
    res.status(400).send(unsupportedContract.response.body)
  } else {
    next()
  }
}

module.exports = validateUnsupportedContract

const findUnsupported = (contract) => isUnsupported(contract.response.body)

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
