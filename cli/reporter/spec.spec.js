'use strict'

const spec = require('./spec')

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

describe('Spec reporter', function() {

  it('Should return correct logs when turned on', function() {
    expect(spec(null, null, testData))
      .to.eql([
        "account contracts executed",

        "  email contracts executed against account",
        "\u001b[32m    ✔ \u001b[39m\u001b[2mTest api-register passed for email against account\u001b[22m",
        "\u001b[31m    ✖ Test api-login failed for email against account\n    Shape of the data incorrect\u001b[39m",

        "  auth contracts executed against account",
        "\u001b[32m    ✔ \u001b[39m\u001b[2mTest api-register passed for auth against account\u001b[22m",
        "\u001b[31m    ✖ Test api-login failed for auth against account\n    Shape of the data incorrect\u001b[39m",
        "\u001b[32m    ✔ \u001b[39m\u001b[2mTest api-getbyid passed for auth against account\u001b[22m",

        "  frontEnd contracts executed against account",
        "\u001b[32m    ✔ \u001b[39m\u001b[2mTest api-getbyid passed for frontEnd against account\u001b[22m",
        "\u001b[32m    ✔ \u001b[39m\u001b[2mTest api-login passed for frontEnd against account\u001b[22m"
      ])
  })

})
