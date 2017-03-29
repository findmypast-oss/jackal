const async = require('async')
const provider = require('./test-provider')
const jackal = require('./test-jackal')
const consumer = require('./../../client')

describe('Given a jackal and a provider', function() {
  var server = null

  before(function(done) {
    jackal.start(done)
  })

  after(function(done) {
    async.parallel([jackal.stop, provider.stop], done)
  })

  it('The provider should start successfully', function(done){
    provider.start({
      port: 5000,
      contract: { version: '1' }
    }, done)
  })

  it('The first contract should pass', function(done) {
    consumer.send(
      'test/integration/contract-v1.json',
      'http://localhost:25863/api/contracts',
      function (err, response, body) {
        expect(err).to.not.exist
        expect(response.statusCode).to.equal(201)

        const parsed = JSON.parse(body)
        expect(parsed[0].status).to.equal('Pass')

        done()
      }
    )
  })

  it('The provider should stop successfully', function(done) {
    provider.stop(done)
  })

  it('The provider should start successfully with contract v2', function(done){
    provider.start({
      port: 5000,
      contract: { version: 'abc' }
    }, done)
  })

  it('The contract should fail for the new provider', function(done){
    consumer.run(
      'http://localhost:25863/api/contracts/integration',
      function (err, response, body) {
        expect(response.statusCode).to.equal(200)

        const parsed = JSON.parse(body)
        expect(parsed[0].status).to.equal('Fail')
        expect(parsed[0].error).to.exist

        done()
      }
    )
  })

  it('Should pass if one passing build', function(done) {
    consumer.send(
        'test/integration/contract-v2.json',
        'http://localhost:25863/api/contracts',
        function (err, response, body) {
          expect(err).to.not.exist
          expect(response.statusCode).to.equal(201)

          const parsed = JSON.parse(body)
          expect(parsed[0].status).to.equal('Pass')

          done()
        }
      )
  })
})
