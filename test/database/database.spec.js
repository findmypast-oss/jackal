'use strict'

const chai = require('chai')
const expect = chai.expect

const DB = require('../../lib/db')

describe('Database', function () {
  let config, db

  before(function () {
    config = { path: 'test/database/files/db.json' }
    db = new DB(config)
  })

  describe('cached', function () {
    it('should return true if the hash exists', function () {
      expect(db.cached('contracts', '82143d76f8d46e9894edbb23457459e07929b2b5707fd90b3432270306286c56')).to.be.true
    })

    it('should return false if the hash does not exist', function () {
      expect(db.cached('contracts', 'hash')).to.be.false
    })
  })

  describe('dump', function () {
    it('should return a string', function () {
      expect(db.dump()).to.be.a('string')
    })

    it('should return a valid json object', function () {
      const json = db.dump()
      const object = JSON.parse(json)
      expect(object).to.be.an('object')
    })
  })

  describe('getAPIsByConsumer', function () {
    it('should return an empty array for a non-existent consumer', function () {
      expect(db.getAPIsByConsumer('fake')).to.be.deep.equal([])
    })

    it('should list all APIs consumed by an existing consumer', function () {
      expect(db.getAPIsByConsumer('itunes_search_app')).to.be.deep.equal([ 'search_by_term_and_country' ])
    })
  })

  describe('getAPIsByConsumerAndProvider', function () {
    it('should return an empty array for a non-existent consumer', function () {
      expect(db.getAPIsByConsumerAndProvider('fake', 'itunes')).to.be.deep.equal([])
    })

    it('should return an empty array for a non-existent provider', function () {
      expect(db.getAPIsByConsumerAndProvider('itunes_search_app', 'fake')).to.be.deep.equal([])
    })

    it('should return an empty array for a non-existent consumer and provider', function () {
      expect(db.getAPIsByConsumerAndProvider('fake', 'fake')).to.be.deep.equal([])
    })

    it('should list all APIs consumed by an existing consumer and provider', function () {
      expect(db.getAPIsByConsumerAndProvider('itunes_search_app', 'itunes')).to.be.deep.equal([ 'search_by_term_and_country' ])
    })
  })

  describe('getAPIsByProvider', function () {
    it('should return an empty array for a non-existent consumer', function () {
      expect(db.getAPIsByProvider('fake')).to.be.deep.equal([])
    })

    it('should list all APIs consumed by an existing consumer', function () {
      expect(db.getAPIsByProvider('itunes')).to.be.deep.equal([ 'search_by_term_and_country' ])
    })
  })

  describe('getConsumers', function () {
    it('should list all consumers in the database', function () {
      expect(db.getConsumers()).to.be.deep.equal([ 'itunes_search_app' ])
    })
  })

  describe('getProviders', function () {
    it('should list all providers in the database', function () {
      expect(db.getProviders()).to.be.deep.equal([ 'itunes' ])
    })
  })

  describe('getProvidersByConsumer', function () {
    it('should return an empty array for a non-existent consumer', function () {
      expect(db.getProvidersByConsumer('fake')).to.be.deep.equal([])
    })

    it('should list all providers for an existing consumer', function () {
      expect(db.getProvidersByConsumer('itunes_search_app')).to.be.deep.equal([ 'itunes' ])
    })
  })
})
