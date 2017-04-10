'use strict'

const parseRequest = (request, testUrl) => {
  let url = testUrl || request.baseUrl
  if (request.path) { url = `${url}${request.path}` }
  if (request.query) { url = `${url}${request.query}` }

  const parsedRequest = { url: url }

  if (request.method)   { parsedRequest.method = request.method }
  if (request.headers)  { parsedRequest.headers = request.headers }
  if (request.body)     { parsedRequest.body = request.body }
  if (request.timeout)  { parsedRequest.timeout = request.timeout }

  return parsedRequest
}

module.exports = parseRequest
