'use strict'

module.exports = (baseUrl, path, query) => {
  let url = baseUrl.endsWith('/')
    ? baseUrl.substring(0, baseUrl.length - 1)
    : baseUrl

  if (path) {
    path = path.startsWith('/') ? path.substring(1) : path
    path = path.endsWith('?') ? path.substring(0, path.length - 1) : path
    url = `${url}/${path}`
  }

  if (query) {
    query = query.startsWith('?') ? query.substring(1) : query
    url = `${url}?${query}`
  }

  return url
}
