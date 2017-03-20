'use strict'

const mapResult = result => {
  return {
    name: result.name,
    consumer: result.consumer,
    status: result.err ? 'Fail' : 'Pass'
  }
}

module.exports = mapResult
