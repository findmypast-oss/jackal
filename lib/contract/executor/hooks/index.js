'use strict'

const request = require('request')

const beforeHookFunction = function (contract) {
  return function (done) {
    const beforeHooks = contract.beforeData

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
  const mappedContract = Object.assign({}, contract)
  if (mappedContract.before) {
    mappedContract.beforeData = mappedContract.before.slice(0)
    mappedContract.before = beforeHookFunction(mappedContract)
  }

  return mappedContract
}
