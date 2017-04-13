'use strict'

// TODO: Consider revising this module, _especially_ the exported function with
// the if... elseif... else block

const flattenDeep = require('lodash/flattenDeep')
const processConsumerLogs = require('./process-consumer-logs')
const processValidationLogs = require('./process-validation-logs')

module.exports = (err, response, body) => {
  const logs = []

  if (typeof response === 'string' && response.startsWith('Skipping')) {
    logs.push(response)
  } else if (body.message && body.validations) {
    logs.push(body.message)
    logs.push(processValidationLogs(body.validations))
  } else if (body.message) {
    logs.push(body.message)
  } else if (body.length === 0) {
    logs.push('Failure - no contracts exist')
  } else {
    const provider = body[0].name.split('/')[0]

    if (body.some(result => result.status === 'Fail')) {
      logs.push('Failure - not all contracts passed')
    }

    logs.push(processConsumerLogs(body, provider))
  }

  return flattenDeep(logs)
}
