'use strict'

const parseContract = require('../../../lib/contract/parse-contract')
const isMalformed = require('../../../lib/contract/responseParser/joiParser/errors').isMalformed

const validateMalformedContract = (req, res, next) => {
  const contracts = req.body

  const parsedContracts = contracts.map(parseContract)
  const malformedContract = parsedContracts.find(findMalformed)

  if (malformedContract) {
    res.status(400).send(malformedContract.response.body)
  } else {
    next()
  }
}

module.exports = validateMalformedContract

const findMalformed = function (contract) {
  return isMalformed(contract.response.body)
}
