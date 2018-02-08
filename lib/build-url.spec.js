'use strict'

const buildUrl = require('./build-url')

describe('buildUrl', function () {
  it('should strip the trailing / from the baseUrl', function () {
    expect(buildUrl('url/')).to.equal('url')
  })

  it('should return the unmodified baseUrl when path and query are not specified', function () {
    expect(buildUrl('url')).to.equal('url')
  })

  it('should concatenate the path correctly with no leading slash', function () {
    expect(buildUrl('url', 'path')).to.equal('url/path')
  })

  it('should concatenate the path correctly with leading slash', function () {
    expect(buildUrl('url', '/path')).to.equal('url/path')
  })

  it('should concatenate the path correctly with no leading slash and trailing slash on baseUrl', function () {
    expect(buildUrl('url/', 'path')).to.equal('url/path')
  })

  it('should concatenate the query correctly with no leading question mark', function () {
    expect(buildUrl('url', 'path', 'query')).to.equal('url/path?query')
  })

  it('should concatenate the query correctly with leading question mark', function () {
    expect(buildUrl('url', '/path', '?query')).to.equal('url/path?query')
  })

  it('should concatenate the query correctly with no leading question mark and trailing question mark on path', function () {
    expect(buildUrl('url/', 'path?', 'query')).to.equal('url/path?query')
  })
})
