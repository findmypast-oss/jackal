const async = require('async')
const provider = require('./test-provider')
const jackal = require('./test-jackal')
const consumer = require('./../../client')

function sendContractV1(done) {
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
}

function runContract(done) {
  consumer.run(
    'http://localhost:25863/api/contracts/integration',
    function (err, response, body) {
      expect(response.statusCode).to.equal(200)

      const parsed = JSON.parse(body)
      expect(parsed[0].status).to.equal('Pass')
      expect(parsed[0].error).to.not.exist

      done()
    }
  )
}

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

  it('Sending contract-v1 the first time should pass', function(done) {
    sendContractV1(done)
  })

  it('Sending contract-v1 a second time should pass', function(done) {
    sendContractV1(done)
  })

  it('Sending contract-v1 a third time should pass', function(done) {
    sendContractV1(done)
  })

  it('The provider should stop successfully', function(done) {
    provider.stop(done)
  })

  it('The provider should start successfully with contract-v2', function(done){
    provider.start({
      port: 5000,
      contract: { version: 'abc' }
    }, done)
  })

  it('The existing contract-v1 should fail for the provider with contract-v2', function(done){
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

  it('Sending contract-v2 should pass', function(done) {
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

  it('Running contract-v2 the first time should pass', function(done) {
    runContract(done)
  })

  it('Running contract-v2 a second time should pass', function(done) {
    runContract(done)
  })

  it('Running contract-v2 a third time should pass', function(done) {
    runContract(done)
  })
})
