const normalizeUrl = require('normalize-url')

const buildJackalUrl = (config, path) => {
  let baseUrl = config.jackal.baseUrl.replace(/\/+$/, '')
  let port = config.jackal.port || 80
  path = path || ''
  return normalizeUrl(`${baseUrl}:${port}/${path}`)
}

module.exports = buildJackalUrl
