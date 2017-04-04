const prettyjson = require('prettyjson')

module.exports = function prettyPrint(data, config) {
  if(!config.pretty) return []
  const prettified = prettyjson.render(data)
  return [prettified]
}
