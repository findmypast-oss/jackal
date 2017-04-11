'use strict'

const fs = require('fs')
const yaml = require('js-yaml')
const request = require('request')
const parser = require('./response-contract-results')
const url = require('./jackal-url')

const exitOnMissingContract = (contractsPath, skipMissingContractFlag) => {
  return skipMissingContractFlag && !fs.existsSync(contractsPath)
}

module.exports = (jackalUrl, contractsPath, options, done) => {
  const jackal = url(jackalUrl, '/api/contracts')

  if(exitOnMissingContract(contractsPath, options.skipMissingContract)){
    /* eslint-disable no-console  */
    console.log(`Skipping no contracts, file not found: ${contractsPath}`)
    /* eslint-enble no-console  */
    return done()
  }

  if(!fs.existsSync(contractsPath)){
    return done(`Missing contract file ${contractsPath}`)
  }

  const fileBuffer = fs.readFileSync(contractsPath)

  let bodyBuffer
  if (contractsPath.endsWith('json')) {
    bodyBuffer = fileBuffer
  } else {
    const contracts = yaml.safeLoad(fileBuffer.toString())
    const json = JSON.stringify(contracts)
    bodyBuffer = Buffer.from(json)
  }

  const req = {
    url: jackal,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: bodyBuffer
  }

  request(req, parser(done))
}
