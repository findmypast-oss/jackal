const normalizeUrl = require('normalize-url')

const buildJackalUrl = (jackalUrl, path) => {
  let baseUrl = jackalUrl.replace(/\/+$/, '')
  path = path || ''

  return normalizeUrl(`${baseUrl}/${path}`)
}

module.exports = buildJackalUrl
