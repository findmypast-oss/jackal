'use strict'

const requiredOptions = [
  'name',
  'consumer',
  'request',
  'response'
]

module.exports = (options) => {
  options = options || {}
  requiredOptions.forEach((key) => {
    if (!options.hasOwnProperty(key)) {
      throw new Error(`Invalid contract: Missing required property [${key}]`)
    }
  })
}
