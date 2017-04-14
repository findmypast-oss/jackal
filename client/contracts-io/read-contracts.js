'use strict'

const path = require('path')
const readContractFile = require('./read-contract-file')
const readContractsDir = require('./read-contracts-dir')

const actions = {
  JSON: (contractsPath) => readContractFile(contractsPath),
  YAML: (contractsPath) => readContractFile(contractsPath),
  DIR:  (contractsPath) => readContractsDir(contractsPath)
}

const readContract = (contractsPath) => {
  const ext = path.extname(contractsPath).substr(1).toUpperCase() || 'DIR'

  return actions[ext](contractsPath)
}

module.exports = readContract
