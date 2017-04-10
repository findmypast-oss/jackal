'use strict'

const url = require('./jackal-url')

const testConfig =

describe('Jackal URL', function() {

  it('Should return http://jackal:25863 when no extra path', function(){
    expect(url('http://jackal:25683'))
      .to.be.eql('http://jackal:25863')
  })

  it('Should set path to http://jackal:25863/api/contracts', function() {
    expect(url('http://jackal:25683', 'api/contracts'))
      .to.be.eql('http://jackal:25863/api/contracts')
  })

  it('Should set path to http://jackal:25863/api/contracts for baseUrl trailing slash', function() {
    expect(url('http://jackal:25683/', 'api/contracts'))
      .to.be.eql('http://jackal:25863/api/contracts')
  })

  it('Should set path to http://jackal/api/contracts for no port specified', function() {
    expect(url('http://jackal', 'api/contracts'))
      .to.be.eql('http://jackal/api/contracts')
  })
})
