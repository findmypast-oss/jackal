'use strict'

const fs = require('fs')

module.exports = (contractsPath) => fs.existsSync(contractsPath)
