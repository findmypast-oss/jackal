'use strict'

const _ = require('lodash')
const uuid = require('uuid/v4')

module.exports = (body, variables) => {
  const mergedVariables = _.merge(variables, { unique_id: uuid() })

  return _.template(body)(mergedVariables)
}
