'use strict'

module.exports = (contractsPath, options, done) => {
  if (options.skipMissingContract) {
    const body = {
      message: `Skipping no contracts, file not found: ${contractsPath}`,
      status: 'SKIPPED',
      results: []
    }

    return done(null, null, body)
  }

  return done(`Missing contract file ${contractsPath}`)
}
