'use strict'

const forEach = require('lodash/forEach')

const graphResults = (results, grapher, startTime) => {
  forEach(results, result => {
    const testOutcome = result.err ? 'fail' : 'pass'
    const totalTime = Date.now() - startTime
    const contractNameArray = result.contract.name.split('/')
    const contractSubKey = contractNameArray.join('.')
    const metricsKey = `consumer.${result.contract.consumer}.${contractSubKey}.${testOutcome}`
    grapher.timing(metricsKey, totalTime)
  })
}

module.exports = graphResults
