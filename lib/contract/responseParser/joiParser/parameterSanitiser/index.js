'use strict'

const sanitiseParameter = value => {
  if (value === 'null') { return null }
  if (isString(value))  { return value.substring(1, value.length - 1) }
  if (isInteger(value)) { return parseInt(value) }
  if (isFloat(value))   { return parseFloat(value) }

  return value
}

module.exports = sanitiseParameter

const isBackTicked = value => value.startsWith('`') && value.endsWith('`')
const isDoubleQuoted = value => value.startsWith('"') && value.endsWith('"')
const isFloat = value => /^[+-]?\d+[.]\d+$/.test(value)
const isInteger = value => /^([+-]?[1-9]+\d*)$|^0$/.test(value)
const isSingleQuoted = value => value.startsWith(`'`) && value.endsWith(`'`)
const isString = value => isBackTicked(value) || isSingleQuoted(value) || isDoubleQuoted(value)
