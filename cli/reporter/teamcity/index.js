'use strict'

// TODO: Consider revising this module, _especially_ the exported function with
// the if... elseif... else block

const flattenDeep = require('lodash/flattenDeep')
const processConsumerLogs = require('./process-consumer-logs')

module.exports = (err, response, body) => {
  let logs = []

  if (typeof response === 'string' && response.startsWith('Skipping')) {
    logs.push(response)
  } else if (body.message) {
    logs.push(JSON.stringify(body))
  } else {
    const provider = body[0].name.split('/')[0]
    logs.push(processConsumerLogs(body, provider))
  }

  return flattenDeep(logs)
}
