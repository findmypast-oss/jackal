'use strict'

const teamcity = require('./teamcity')

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

describe('Teamcity logger', function() {

  it('Should return empty array when turned off', function(){
    expect(teamcity(testData, {teamcity: false}))
      .to.be.eql([])
  })

  it('Should return correct logs when turned on', function() {
    expect(teamcity(testData, {teamcity: true}))
      .to.eql([
        "##teamcity[testSuiteStarted name='provider']",
        "##teamcity[testStarted name='consumer.api.scenario1']",
        "##teamcity[testFinished name='consumer.api.scenario1']",
        "##teamcity[testStarted name='consumer.api.scenario2']",
        "##teamcity[testFailed name='consumer.api.scenario2' message='Test failed for consumer' details='Shape of the data incorrect']",
        "##teamcity[testFinished name='consumer.api.scenario2']",
        "##teamcity[testSuiteEnded name='provider']"
      ])
  })
})
