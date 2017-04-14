'use strict'

const fs = require('fs')
const yaml = require('js-yaml')

module.exports = (filePath) => {
  const fileBuffer = fs.readFileSync(filePath)

  return filePath.endsWith('json')
    ? JSON.parse(fileBuffer.toString())
    : yaml.safeLoad(fileBuffer.toString())
}
