'use strict'

const fs = require('fs')
const yaml = require('js-yaml')

const exitOnMissingContract = (contractsPath, skipMissingContractFlag) => skipMissingContractFlag && !fs.existsSync(contractsPath)

const contractExists = contractsPath => !fs.existsSync(contractsPath)

const readContents = contractsPath => {
  const fileBuffer = fs.readFileSync(contractsPath)

  if (contractsPath.endsWith('json')) {
    return fileBuffer
  }

  const contracts = yaml.safeLoad(fileBuffer.toString())
  const json = JSON.stringify(contracts)
  return Buffer.from(json)

}

module.exports = {
  exitOnMissingContract: exitOnMissingContract,
  contractExists: contractExists,
  readContents: readContents
}
