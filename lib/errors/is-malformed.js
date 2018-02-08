'use strict'

const isMalformed = (value) => {
  return value
    && value.name && value.name === 'JoiError'
    && value.message && value.message === 'Joi string not well formed'
}

module.exports = isMalformed
