const normalizeUrl = require('normalize-url')

const buildJackalUrl = (config, path) => {
  let baseUrl = config.jackal.baseUrl.replace(/\/+$/, '')
  let port = config.jackal.port || 80
  path = path || ''

  let query = ''

  if (config.stats) {
    if (config.stats.consumer) {
      query = `?consumer=${config.stats.consumer}`
    }

    if (config.stats.provider) {
      providerQuery = `provider=${config.stats.provider}`
      query = query === '' ? `?${providerQuery}` : `${query}&${providerQuery}`
    }
  }

  return normalizeUrl(`${baseUrl}:${port}/${path}${query}`)
}

module.exports = buildJackalUrl
