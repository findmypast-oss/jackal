'use strict'

module.exports = (contractsPath, options, done) => {
  if (options.skipMissingContract) {
    const body = {
      message: `Skipping, all contract files skipped: ${contractsPath}`,
      status: 'SKIPPED',
      results: []
    }

    return done(null, null, body)
  }

  return done(`All contract files skipped: ${contractsPath}`)
}
