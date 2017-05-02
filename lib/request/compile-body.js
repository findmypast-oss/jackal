'use strict'

const _ = require('lodash')
const hyperid = require('hyperid')
const instance = hyperid()

module.exports = (body, variables) => {
  const mergedVariables = _.merge(variables, { unique_id: instance()})

  return _.template(body)(mergedVariables)
}
