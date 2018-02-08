'use strict'

const buildError = (error) => {
  let errorString = error.message || error.toString()

  if (error.detail) {
    errorString = `${errorString}\n${error.detail}`
  }

  return errorString
}

const mapResult = (result) => {
  return {
    name: result.contract.name,
    consumer: result.contract.consumer,
    status: result.err ? 'Fail' : 'Pass',
    error: result.err ? buildError(result.err) : null
  }
}

module.exports = mapResult
