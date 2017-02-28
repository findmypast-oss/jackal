const buildError = error => {
  return {
    name: error.name,
    message: error.details.map(d => `\t${d.message}`).join(',\n')
  }
}

module.exports = buildError
