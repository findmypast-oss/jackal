'use strict'

const firstCallBack = (callBackIndex) => callBackIndex === 0
const lastCallBack = (callBackIndex, beforeHooks) => callBackIndex >= beforeHooks.length - 1

const requestFunctions = (contract) => {
  return contract.before.map((beforeHook, callBackIndex) => {
    const url = beforeHook.url
    const method = beforeHook.method
    const timeout = beforeHook.timeout

    const callBackDeclaration = firstCallBack(callBackIndex) ? '' : `const cb${callBackIndex} = `
    const nextCallBack = lastCallBack(callBackIndex, contract.before) ? 'done' : `cb${callBackIndex+1}`

    return `${callBackDeclaration}request({method:'${method}',uri:'${url}',timeout:${timeout}}, ${nextCallBack})`
  })
}

const beforeHookBody = (contract) => {
  const functionBodyLines = ["const request = require('request')","console.log('Running webhooks')"].concat(requestFunctions(contract))
  return functionBodyLines.join('\n')
}

const beforeHookFunction = (contract) => {
  return (done) => {

  }
}

module.exports = {
  mapContractHooks: (contract) => {
    if(contract.before){
      const beforeFunctionBody = beforeHookBody(contract)
      const beforeFunction = new Function('done', beforeFunctionBody)
      contract.before = beforeFunction
    }
    return contract
  },
  requestFunctions: requestFunctions,
  beforeHookBody: beforeHookBody
}
