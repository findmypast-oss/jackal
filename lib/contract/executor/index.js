'use strict'

const async = require('async');
const Contract = require('../object')

const validateContract = (contract, cb) => {
  const contractObj = new Contract(contract)

  contractObj.validate(function (err) {
    cb(null, {
      contract: contractObj,
      err: err
    })
  })
}

module.exports = (contracts, cb) => {
  async.mapSeries(contracts, validateContract, cb)
}
