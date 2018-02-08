'use strict'

module.exports = (res, body) => {
  const contentType = res.headers['Content-Type'] || res.headers['content-type']

  return contentType.startsWith('application/json') ? JSON.parse(body) : body
}
