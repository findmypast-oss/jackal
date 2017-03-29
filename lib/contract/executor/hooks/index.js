'use strict'

const request = require('request')

const beforeHookFunction = function (contract) {
  return function (done) {
    const beforeHooks = contract.beforeData.slice(0)

    beforeHooks.forEach(function (beforeHook) {
      const requestParameter = {
        method: beforeHook.method,
        uri: beforeHook.url,
        timeout: beforeHook.timeout,
        body: beforeHook.body
      }

      request(requestParameter, function (error) {
        if (error) {
          /* eslint-disable no-console  */
          const method = beforeHook.method
          const url = beforeHook.url
          console.error(`Before hook error (${method} ${url}):`, error)
          /* eslint-enable no-console */
        }
      })
    })

    done()
  }
}

module.exports = function (contract) {
  if (contract.before) {
    contract.beforeData = contract.before.slice(0)
    contract.before = beforeHookFunction(contract)
  }

  return contract
}
