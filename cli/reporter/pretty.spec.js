'use strict'

const pretty = require('./pretty')

const testData = [
  {
    name: 'provider/api/scenario1',
    consumer: 'consumer',
    status: 'Pass',
    error: null
  },
  {
    name: 'provider/api/scenario2',
    consumer: 'consumer',
    status: 'Fail',
    error: 'Shape of the data incorrect'
  }

]

describe('Pretty logger', function() {
  it('Should return correct logs when turned on', function() {
    const input = JSON.stringify(testData)

    expect(pretty(input).length).to.equal(1)
  })
})
