'use strict'

const parseKeyValuePair = kvp => {
  return {
    key: parseKey(kvp),
    expr: kvp[4]
  }
}

const parseKey = kvp => kvp[0][1].join('')

module.exports = parseKeyValuePair
