'use strict'

const forEach = require('lodash/forEach')

const graphResults = (results, grapher, startTime) => {
  forEach(results, result => {
    const testOutcome = result.err ? 'fail' : 'pass'
    const totalTime = Date.now() - startTime
    const contractName = result.contract.name.replace(/\//g, '_')
    grapher.timing(`consumer.${result.contract.consumer}.${contractName}.${testOutcome}`, totalTime)
  })
}

module.exports = graphResults
