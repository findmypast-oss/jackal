const async = require('async')
const provider = require('./test-provider')
const jackal = require('./test-jackal')
const consumer = require('./client')

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
    consumer.send('test/integration/contract-v1.json', true, done)
  })

  it('Sending contract-v1 a second time should pass', function(done) {
    consumer.send('test/integration/contract-v1.json', true, done)
  })

  it('Sending contract-v1 a third time should pass', function(done) {
    consumer.send('test/integration/contract-v1.json', true, done)
  })

  it('Jackal should have hit "/contract" 3 times', function() {
    expect(provider.contractHitCount()).to.equal(3)
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
    consumer.run('integration', false, done)
  })

  it('Sending contract-v2 should pass', function(done) {
    consumer.send('test/integration/contract-v2.json', true, done)
  })

  it('Running contract-v2 the first time should pass', function(done) {
    consumer.run('integration', true, done)
  })

  it('Running contract-v2 a second time should pass', function(done) {
    consumer.run('integration', true, done)
  })

  it('Running contract-v2 a third time should pass', function(done) {
    consumer.run('integration', true, done)
  })

  it('Jackal should have hit "/contract" 5 times', function() {
    expect(provider.contractHitCount()).to.equal(5)
  })
})
