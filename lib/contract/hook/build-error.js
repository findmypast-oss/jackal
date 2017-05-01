'use strict'

module.exports = (name, type, expected, actual) => {
  const errName = `${name} ${type} hook failed.`
  const errDetail = `Expected response status: ${expected}, got: ${actual}`
  return new Error(`${errName} ${errDetail}`)
}
