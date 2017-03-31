const provider = require('./support/provider')
const jackal = require('./support/jackal')
const client = require('./support/client')

describe('Happy path tests', function() {

  before(jackal.start)
  after(jackal.stop)
  after(provider.stop)

  it('The provider should start successfully', function(done){
    provider.start({ port: 5000, contract: { version: '1' } }, done)
  })

  it('Sending contract-v1 the first time should pass', function(done) {
    client.send({ filePath: 'test/integration/contract-v1.json', isPass: true }, done)
  })

  it('Sending contract-v1 a second time should pass', function(done) {
    client.send({ filePath: 'test/integration/contract-v1.json', isPass: true }, done)
  })

  it('Sending contract-v1 a third time should pass', function(done) {
    client.send({ filePath: 'test/integration/contract-v1.json', isPass: true }, done)
  })

  it('Jackal should have hit "/contract" 3 times', function() {
    expect(provider.contractHitCount()).to.equal(3)
  })

  it('The provider should stop successfully', function(done) {
    provider.stop(done)
  })

  it('The provider should start successfully with contract-v2', function(done){
    provider.start({ port: 5000, contract: { version: 'abc' } }, done)
  })

  it('The existing contract-v1 should fail for the provider with contract-v2', function(done){
    client.run({ provider: 'integration', isPass: false }, done)
  })

  it('Sending contract-v2 should pass', function(done) {
    client.send({ filePath: 'test/integration/contract-v2.json', isPass: true }, done)
  })

  it('Running contract-v2 the first time should pass', function(done) {
    client.run({ provider: 'integration', isPass: true }, done)
  })

  it('Running contract-v2 a second time should pass', function(done) {
    client.run({ provider: 'integration', isPass: true }, done)
  })

  it('Running contract-v2 a third time should pass', function(done) {
    client.run({ provider: 'integration', isPass: true }, done)
  })

  it('Jackal should have hit "/contract" 5 times', function() {
    expect(provider.contractHitCount()).to.equal(5)
  })
})
