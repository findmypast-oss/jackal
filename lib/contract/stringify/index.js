'use strict'

const stringify = require('fast-json-stringify')
const { stringResponseBodySchema, objectResponseBodySchema } = require('./schema')

const stringResponseStringify = stringify(stringResponseBodySchema)
const objectResponseStringify = stringify(objectResponseBodySchema)

const mapContract = contract => {
  return typeof contract.response.body === 'string'
    ? stringResponseStringify(contract)
    : objectResponseStringify(contract)
}

const stringifyContracts = contracts => `[ ${contracts.map(mapContract).join(', ')} ]`

module.exports = stringifyContracts
