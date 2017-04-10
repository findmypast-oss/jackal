'use strict'

const fs = require('fs')
const client = require('../../../client')

const send = (options, done) => {
  client.send(
    'http://localhost:25863',
    options.filePath,
    options,
    done
  )
}

const run = (options, done) => {
  client.run(
    'http://localhost:25863',
    options.provider,
    options,
    done
  )
}

const dump = (options, done) => {
  client.dump(
    'http://localhost:25863',
    options,
    done
  )
}

const stats = (options, done) => {
  client.stats(
    'http://localhost:25863',
    options,
    done
  )
}

module.exports = { run, send, stats, dump }
