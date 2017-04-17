'use strict'

const flattenDeep = require('lodash/flattenDeep')
const groupBy = require('lodash.groupby')
const map = require('lodash.map')
const processConsumerLogs = require('./process-consumer-logs')
const processValidationLogs = require('./process-validation-logs')

const actions = {
  SKIPPED:      (body) => [ body.message ],
  ERROR:        (body) => [ body.message ],
  NO_CONTRACTS: (body) => [ body.message ],
  INVALID:      (body) => [ body.message, processValidationLogs(body.results) ],
  FAILED:       (body) => [ body.message, handleConsumerLogs(body) ],
  PASSED:       (body) => [ handleConsumerLogs(body) ]
}

const handleConsumerLogs = (body) => {
  const providerGroups = groupBy(body.results, result => result.name.split('/')[0])
  const consumerLogs = map(providerGroups, (providerGroup, providerName) => processConsumerLogs(providerGroup, providerName))
  return consumerLogs

  // const provider = body.results[0].name.split('/')[0]
  // return processConsumerLogs(body.results, provider)
}

module.exports = (err, response, body) => {
  const logs = actions[body.status](body)

  return flattenDeep(logs)
}
