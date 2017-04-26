'use strict'

const request = require('request')
const buildUrl = require('../../../build-url')

const bodyIsString = (hook) => typeof hook.body === 'string'

const hookFunction = (hookData) => {
  return function (done) {
    hookData.forEach((hook) => {
      const url = hook.baseUrl
        ? buildUrl(hook.baseUrl, hook.path, hook.query)
        : hook.url

      const requestParameter = {
        method: hook.method,
        url: url,
        timeout: hook.timeout,
        body: bodyIsString(hook) ? hook.body : JSON.stringify(hook.body),
        headers: hook.headers
      }

      request(requestParameter, (error) => {
        if (error) {
          const method = hook.method
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
