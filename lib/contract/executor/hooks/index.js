'use strict'

const request = require('request')

const hookFunction = function (hookData) {
  return function (done) {

    hookData.forEach(function (hook) {
      const requestParameter = {
        method: hook.method,
        uri: hook.url,
        timeout: hook.timeout,
        body: hook.body
      }

      request(requestParameter, function (error) {
        if (error) {
          /* eslint-disable no-console  */
          const method = hook.method
          const url = hook.url
          console.error(`Hook error (${method} ${url}):`, error)
          /* eslint-enable no-console */
        }
      })
    })

    done()
  }
}

const addBeforeHooks = function (contract) {
  if (contract.before) {
    contract.beforeData = contract.before.slice(0)
    contract.before = hookFunction(contract.before)
  }
  return contract
}

const addAfterHooks = function (contract) {
  if (contract.after) {
    contract.afterData = contract.after.slice(0)
    contract.after = hookFunction(contract.after)
  }
  return contract
}

module.exports = function (contract) {
  let mappedContract = Object.assign({}, contract)
  mappedContract = addBeforeHooks(mappedContract)
  mappedContract = addAfterHooks(mappedContract)

  return mappedContract
}
