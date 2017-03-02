'use strict'

const crypto = require('crypto')

const hashContracts = contracts => {
  const hash = crypto.createHash('sha256')
  hash.update(contracts)

  return hash.digest('hex')
}

module.exports = hashContracts
