'use strict'

module.exports = (baseUrl, path, query) => {
  let url = baseUrl

  if (path) {
    path = path.startsWith('/') ? path : `/${path}`
    url = `${url}${path}`
  }

  if (query) {
    query = query.startsWith('?') ? query : `?${query}`
    url = `${url}${query}`
  }

  return url
}
