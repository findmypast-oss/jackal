'use strict'

const mapValidation = (validation, index, contracts) => {
  const contract = contracts[index]

  return {
    contract: `${contract.name} <- ${contract.consumer}`,
    valid: validation.valid,
    errors: validation.errors
  }
}

module.exports = mapValidation
