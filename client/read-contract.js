'use strict'

const fs = require('fs')
const yaml = require('js-yaml')

const exitOnMissingContract = (contractsPath, skipMissingContractFlag) => {
  return skipMissingContractFlag && !fs.existsSync(contractsPath)
}

const contractExists = contractsPath => !fs.existsSync(contractsPath)

const readFile = filePath => {
  const fileBuffer = fs.readFileSync(filePath)

  if (filePath.endsWith('json')) {
    return JSON.parse(fileBuffer.toString())
  }

  return yaml.safeLoad(fileBuffer.toString())
}

const readContents = contractsPath => {
  if(fs.lstatSync(contractsPath).isDirectory()){
    return fs.readdirSync(contractsPath)
      .reduce((acc, file) => {
        const contractObject = readFile(`${contractsPath}/${file}`)

        if (!Object.keys(acc).length) {
          return contractObject
        }

        const consumer = Object.keys(acc)[0]
        const newAcc = {}
        newAcc[consumer] = Object.assign(acc[consumer], contractObject[consumer])

        return newAcc
      }, {})
  }

  return readFile(contractsPath)
}

module.exports = {
  exitOnMissingContract: exitOnMissingContract,
  contractExists: contractExists,
  readContents: readContents
}
