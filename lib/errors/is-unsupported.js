'use strict'

const isUnsupported = (value) => {
  return value
    && value.name && value.name === 'JoiError'
    && value.message && value.message === 'Joi type not supported'
}

module.exports = isUnsupported
