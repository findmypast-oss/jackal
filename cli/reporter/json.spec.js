'use strict'

const json = require('./json')

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

describe('Standard logger', function() {

  it('Should return correct logs when turned on', function() {
    expect(json(testData, {standard: true}))
      .to.eql([testData])
  })
})
