const normalizeUrl = require('normalize-url')

const buildJackalUrl = (config, path) => {
  let host = config.jackal.host.replace(/\/+$/, '')
  let port = config.jackal.port || 80
  path = path || ''
  return normalizeUrl(`${host}:${port}/${path}`)
}

module.exports = buildJackalUrl
