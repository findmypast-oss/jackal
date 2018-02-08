'use strict'

const _ = require('lodash')
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

const processLogsForProvider = (providerGroup, providerName) => {
  return processConsumerLogs(providerGroup, providerName)
}

const handleConsumerLogs = (body) => {
  const providerGroups = _.groupBy(body.results, result => result.name.split('/')[0])
  const consumerLogs = _.map(providerGroups, processLogsForProvider)
  return consumerLogs
}

module.exports = (err, response, body) => {
  const logs = actions[body.status](body)

  return _.flattenDeep(logs)
}
