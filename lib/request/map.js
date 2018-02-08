'use strict'

const buildUrl = require('../build-url')

const mapRequest = (request, testUrl) => {
  let baseUrl = testUrl || request.baseUrl

  const parsedRequest = { url: buildUrl(baseUrl, request.path, request.query) }

  if (request.method)   { parsedRequest.method = request.method }
  if (request.headers)  { parsedRequest.headers = request.headers }
  if (request.body)     { parsedRequest.body = request.body }
  if (request.timeout)  { parsedRequest.timeout = request.timeout }
  parsedRequest.rejectUnauthorized = request.rejectUnauthorized !== false

  return parsedRequest
}

module.exports = mapRequest
