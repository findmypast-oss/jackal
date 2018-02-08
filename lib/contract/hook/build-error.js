'use strict'

module.exports = (name, type, expected, res) => {
  const message = `${name} ${type} hook failed.`

  const err = new Error(message)
  err.message = message

  const status = `Expected response status: ${expected}, got: ${res.statusCode}`
  const body = typeof res.body === 'string' ? res.body : JSON.stringify(res.body)
  err.detail = `${status}\n${body}`

  return err
}
