const async = require('async')
const provider = require('./test-provider')
const jackal = require('./test-jackal')
const consumer = require('./../../client')

function sendContractV1(done) {
  consumer.send(
    'test/integration/contract-v1.json',
    'http://localhost:25863/api/contracts',
    true,
    function (err, results) {
      expect(err).to.not.exist
      expect(results[0].status).to.equal('Pass')
      done()
    }
  )
}

function runContract(done) {
  consumer.run(
    'http://localhost:25863/api/contracts/integration',
    true,
    function (err, results) {
      expect(err).to.not.exist
      expect(results[0].status).to.equal('Pass')
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
      true,
      function (err, results) {
        expect(err).to.exist
        expect(results[0].status).to.equal('Fail')
        expect(results[0].error).to.exist
        done()
      }
    )
  })

  it('Sending contract-v2 should pass', function(done) {
    consumer.send(
        'test/integration/contract-v2.json',
        'http://localhost:25863/api/contracts',
        true,
        function (err, results) {
          expect(err).to.not.exist
          expect(results[0].status).to.equal('Pass')
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

  it('Jackal should have hit /contract 8 times', function() {
    expect(provider.contractHitCount()).to.equal(8)
  })
})
