/* eslint-disable no-console  */
'use strict'
const request = require('request')
const beforeHookFunction = (contract) => {

  return (done) => {
    const beforeHooks = contract.beforeData.slice(0)

    beforeHooks.forEach((beforeHook) => {
      const url = beforeHook.url
      const method = beforeHook.method
      const timeout = beforeHook.timeout
      const body = beforeHook.body

      request({method:method, uri:url, timeout:timeout, body:body}, (error) => {
        if(error) {
          console.log(`Before hook error (${method} ${url}):`, error)
        }
      })
    })
    done()
  }

}

module.exports = {
  mapContractHooks: (contract) => {
    if(contract.before){
      contract.beforeData = contract.before.slice(0)
      contract.before = beforeHookFunction(contract)
    }
    return contract
  }
}
/* eslint-enable no-console */
