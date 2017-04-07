'use strict'

const teamcity = require('./teamcity')

const testData = [
  {
    name: 'account/api/register',
    consumer: 'email',
    status: 'Pass',
    error: null
  },
  {
    name: 'account/api/login',
    consumer: 'email',
    status: 'Fail',
    error: 'Shape of the data incorrect'
  },
  {
    name: 'account/api/register',
    consumer: 'auth',
    status: 'Pass',
    error: null
  },
  {
    name: 'account/api/login',
    consumer: 'auth',
    status: 'Fail',
    error: 'Shape of the data incorrect'
  },
  {
    name: 'account/api/getbyid',
    consumer: 'auth',
    status: 'Pass',
    error: null
  },
  {
    name: 'account/api/getbyid',
    consumer: 'frontEnd',
    status: 'Pass',
    error: null
  },
  {
    name: 'account/api/login',
    consumer: 'frontEnd',
    status: 'Pass',
    error: null
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
        "##teamcity[testSuiteStarted name='account contracts']",

            "##teamcity[testSuiteStarted name='email contracts executed against account']",

                "##teamcity[testStarted name='email.api.register']",
                "##teamcity[testFinished name='email.api.register']",

                "##teamcity[testStarted name='email.api.login']",
                "##teamcity[testFailed name='email.api.login' message='Test failed for email' details='Shape of the data incorrect']",
                "##teamcity[testFinished name='email.api.login']",

            "##teamcity[testSuiteEnded name='email contracts executed against account']",

            "##teamcity[testSuiteStarted name='auth contracts executed against account']",

                "##teamcity[testStarted name='auth.api.register']",
                "##teamcity[testFinished name='auth.api.register']",

                "##teamcity[testStarted name='auth.api.login']",
                "##teamcity[testFailed name='auth.api.login' message='Test failed for auth' details='Shape of the data incorrect']",
                "##teamcity[testFinished name='auth.api.login']",

                "##teamcity[testStarted name='auth.api.getbyid']",
                "##teamcity[testFinished name='auth.api.getbyid']",

            "##teamcity[testSuiteEnded name='auth contracts executed against account']",

            "##teamcity[testSuiteStarted name='frontEnd contracts executed against account']",

                "##teamcity[testStarted name='frontEnd.api.getbyid']",
                "##teamcity[testFinished name='frontEnd.api.getbyid']",

                "##teamcity[testStarted name='frontEnd.api.login']",
                "##teamcity[testFinished name='frontEnd.api.login']",

            "##teamcity[testSuiteEnded name='frontEnd contracts executed against account']",

        "##teamcity[testSuiteEnded name='account contracts']"
      ])
  })
})
