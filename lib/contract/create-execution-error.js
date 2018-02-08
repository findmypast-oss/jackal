'use strict'

module.exports = (detail, path, res, body) => {
  const message = `Contract failed: ${detail.message}`

  const err = new Error(message)
  err.message = message

  const status = `response.statusCode: ${res.statusCode}\n`

  const stringified = typeof body === 'string' ? body : JSON.stringify(body)
  const responseBody = `response.body: ${stringified.trim()}`

  err.detail = `${status}${responseBody}`

  return err
}
