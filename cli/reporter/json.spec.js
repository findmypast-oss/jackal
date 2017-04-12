'use strict'

const json = require('./json')

const dataIn = [
  {
    name: 'provider/api/scenario1',
    consumer: 'consumer',
    status: 'Pass',
    error: null
  }
]

const jsonOut = "[{\"name\":\"provider/api/scenario1\",\"consumer\":\"consumer\",\"status\":\"Pass\",\"error\":null}]"

describe('Standard logger', function() {
  it('Should return correct logs when turned on', function() {
    expect(json(null, dataIn)).to.eql([jsonOut])
  })
})
