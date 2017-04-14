'use strict'

const fs = require('fs')
const merge = require('lodash.merge')
const readContractFile = require('./read-contract-file')

const readContractsDir = (contractsPath) => {
  const contracts = fs.readdirSync(contractsPath)
    .map(filePath => readContractFile(`${contractsPath}/${filePath}`))
  const args = [ {} ].concat(contracts)

  return merge.apply(null, args)
}

module.exports = readContractsDir
