'use strict'

const parseAllowTokens = tokens => {
  return {
    head: tokens[1][0][0][0],
    tail: tokens[1][1]
  }
}

const sanitiseAllowValue = value => {
  switch (value) {
    case 'true':      return true
    case 'false':     return false
    case 'NULL':      return null
    case 'UNDEFINED': return undefined
    default:          return parseAllowValue(value)
  }
}

module.exports = { parseAllowTokens, sanitiseAllowValue }

const parseAllowValue = value => {
  return value[0] === `'`
    ? parseAllowStringValue(value[1])
    : parseAllowNumberValue(value)
}

const parseAllowStringValue = value => value.map(v => v[0][0]).join('')

const parseAllowNumberValue = value => {
  if (Array.isArray(value[1][0][0])) {
    const { sign, integer, decimal } = parseAllowRealValueTokens(value)
    const number = integer + ( decimal / 10 )

    return sign === '-' ? -1 * number : number
  } else {
    const { sign, integer } = parseAllowIntegerValueTokens(value)

    return sign === '-' ? -1 * integer : integer
  }
}

const parseAllowIntegerValueTokens = value => {
  return {
    sign: value[0] === null ? null : value[0][0],
    integer: parseInt(value[1][0][0])
  }
}

const parseAllowRealValueTokens = value => {
  return {
    sign: value[0] === null ? null : value[0][0],
    integer: parseInt(value[1][0][0][0]),
    decimal: parseInt(value[1][0][2][0])
  }
}
