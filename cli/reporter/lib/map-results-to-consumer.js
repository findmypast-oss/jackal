'use strict'

module.exports = (results) => {
  return results.reduce((acc, result) => {
    acc[result.consumer] = acc[result.consumer] || []
    acc[result.consumer].push(result)
    return acc
  }, {})
}
