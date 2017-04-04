'use strict'

const sanitiseParameter = function (value) {
  if (value === 'null') { return null }
  if (isString(value))  { return value.substring(1, value.length - 1) }
  if (isInteger(value)) { return parseInt(value) }
  if (isFloat(value))   { return parseFloat(value) }

  return value
}

module.exports = sanitiseParameter

const isBackTicked = function (value) {
  return value.startsWith('`') && value.endsWith('`')
}

const isDoubleQuoted = function (value) {
  return value.startsWith('"') && value.endsWith('"')
}

const isFloat = function (value) {
  return /^[+-]?\d+[.]\d+$/.test(value)
}

const isInteger = function (value) {
  return /^([+-]?[1-9]+\d*)$|^0$/.test(value)
}

const isSingleQuoted = function (value) {
  return value.startsWith(`'`) && value.endsWith(`'`)
}

const isString = function (value) {
  return isBackTicked(value) || isSingleQuoted(value) || isDoubleQuoted(value)
}
