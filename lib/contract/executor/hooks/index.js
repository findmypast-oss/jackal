'use strict'

const request = require('request')

const hookFunction = (hookData) => {
  return function (done) {

    hookData.forEach((hook) => {
      const requestParameter = {
        method: hook.method,
        uri: hook.url,
        timeout: hook.timeout,
        body: hook.body
      }

      request(requestParameter, (error) => {
        if (error) {
          const method = hook.method
          const url = hook.url
          /* eslint-disable no-console  */
          console.error(`Hook error (${method} ${url}):`, error)
          /* eslint-enable no-console */
        }
      })
    })

    done()
  }
}

const addBeforeHooks = (contract) => {
  if (contract.before) {
    contract.beforeData = contract.before.slice(0)
    contract.before = hookFunction(contract.before)
  }
  
  return contract
}

const addAfterHooks = (contract) => {
  if (contract.after) {
    contract.afterData = contract.after.slice(0)
    contract.after = hookFunction(contract.after)
  }

  return contract
}

module.exports = (contract) => {
  let mappedContract = Object.assign({}, contract)
  mappedContract = addBeforeHooks(mappedContract)
  mappedContract = addAfterHooks(mappedContract)

  return mappedContract
}
