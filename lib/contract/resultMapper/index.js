'use strict'

const mapResult = result => {
  return {
    name: result.contract.name,
    consumer: result.contract.consumer,
    status: result.err ? 'Fail' : 'Pass'
  }
}

module.exports = mapResult
