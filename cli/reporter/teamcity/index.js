'use strict'

const flattenDeep = require('lodash/flattenDeep')
const processConsumerLogs = require('./process-consumer-logs')

const actions = {
  SKIPPED:      (body) => [ body.message ],
  ERROR:        (body) => [ body.message ],
  NO_CONTRACTS: (body) => [ body.message ],
  INVALID:      (body) => [ body.message, JSON.stringify(body.results) ],
  FAILED:       (body) => [ handleConsumerLogs(body) ],
  PASSED:       (body) => [ handleConsumerLogs(body) ]
}

const handleConsumerLogs = (body) => {
  const provider = body.results[0].name.split('/')[0]

  return processConsumerLogs(body.results, provider)
}

module.exports = (err, response, body) => {
  const logs = actions[body.status](body)

  return flattenDeep(logs)
}
