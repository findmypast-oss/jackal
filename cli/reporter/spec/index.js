'use strict'

// TODO: Consider revising this module, _especially_ the exported function with
// the if... elseif... else block

const flattenDeep = require('lodash/flattenDeep')
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
  const provider = body[0].name.split('/')[0]

  return processConsumerLogs(body, provider)
}

module.exports = (err, response, body) => {
  const logs = actions[body.status](body)

  // if (typeof response === 'string' && response.startsWith('Skipping')) {
  //   logs.push(response)
  // } else if (body.message && body.validations) {
  //   logs.push(body.message)
  //   logs.push(processValidationLogs(body.validations))
  // } else if (body.message) {
  //   logs.push(body.message)
  // } else if (body.length === 0) {
  //   logs.push('Failure - no contracts exist')
  // } else {
  //
  //
  //   if (body.some(result => result.status === 'Fail')) {
  //     logs.push('Failure - not all contracts passed')
  //   }
  //
  //   logs.push()
  // }

  return flattenDeep(logs)
}


// // Skipped contracts
// response = null
// body = {
//   message: 'Skipping because of blah blah blah',
//   status: 'SKIPPED'
//   results: []
// }
//
// // Some Error
// response = server.response
// body = {
//   message: 'Some error happened',
//   status: 'ERROR'
//   results: []
// }
//
// // Invalid contracts
// response = server.response
// body = {
//   message: 'One or more contracts are invalid',
//   status: 'INVALID'
//   results: [
//     { validation_one },
//     { validation_two },
//     { etc }
//   ]
// }
//
// // Failing contracts
// response = server.response
// body = {
//   message: 'Not all contracts passed',
//   status: 'FAILED'
//   results: [
//     { result_one },
//     { result_two },
//     { etc }
//   ]
// }
//
// // Passing contracts
// response = server.response
// body = {
//   message: 'All contracts passed',
//   status: 'PASSED'
//   results: [
//     { result_one },
//     { result_two },
//     { etc }
//   ]
// }
