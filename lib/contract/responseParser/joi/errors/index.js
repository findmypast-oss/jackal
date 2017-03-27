'use strict'

const malformed =   { name: 'JoiError', message: 'Joi string not well formed' }
const unsupported = { name: 'JoiError', message: 'Joi type not supported' }

module.exports = { malformed, unsupported }
