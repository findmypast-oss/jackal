'use strict'

const crypto = require('crypto')

const hashData = function (object) {
  const hash = crypto.createHash('sha256')
  hash.update(object)

  return hash.digest('hex')
}

module.exports = hashData
