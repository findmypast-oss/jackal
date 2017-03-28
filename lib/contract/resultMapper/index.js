'use strict'

const Joi = require('joi')

const mapResult = result => {
  return {
    name: result.contract.name,
    consumer: result.contract.consumer,
    status: result.err ? 'Fail' : 'Pass',
    error: result.err ? result.err.toString() : null
  }
}

module.exports = mapResult
