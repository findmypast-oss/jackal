'use strict'

const malformed =   { name: 'JoiError', message: 'Joi string not well formed' }
const unsupported = { name: 'JoiError', message: 'Joi type not supported' }

const isMalformed = value => {
  return value
    && value.name && value.name === 'JoiError'
    && value.message && value.message === 'Joi string not well formed'
}

const isUnsupported = value => {
  return value
    && value.name && value.name === 'JoiError'
    && value.message && value.message === 'Joi type not supported'
}

module.exports = { isMalformed, isUnsupported, malformed, unsupported }
