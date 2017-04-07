# Jackal

[![npm](https://img.shields.io/npm/v/jackal.svg)](https://www.npmjs.com/package/jackal)
[![Build](https://img.shields.io/travis/findmypast-oss/jackal.svg)](https://travis-ci.org/findmypast-oss/jackal)
[![Coverage](https://coveralls.io/repos/github/findmypast-oss/jackal/badge.svg?branch=master)](https://coveralls.io/github/findmypast-oss/jackal?branch=master)
[![License](https://img.shields.io/github/license/findmypast-oss/jackal.svg)](https://github.com/findmypast-oss/jackal/blob/master/LICENSE)

Jackal is a consumer-driven contracts microservice designed to prevent breaking API changes being released by either consumers or providers of APIs.

## Development

Please see the [Jackal Development Guide](./docs/development.md)

## API

Please see the [Jackal API Guide](./docs/api.md)

## Configuration

Please see the [Jackal Config Guide](./docs/config.md)

## Quickstart Guide

### Local

To start a local instance of Jackal with the [default config](./examples/config.json):

```
npm start
```

Alternatively, to use a custom configuration file:

```
npm start /path/to/custom/config.json
```

Jackal should now be available at `http://localhost:25863`, a health endpoint is provided at `/health`

### Docker

To start a dockerised instance of Jackal with the [default config](./examples/config.json):

```
docker run -p 25863:25863 findmypast/jackal
```

Jackal should now be available at `http://localhost:25863`, a health endpoint is provided at `/health`

### Testing a contract

Make sure to define a contract file, e.g:

```
// contracts.json
[
  {
    "name": "itunes/search_by_term_and_country",
    "consumer": "itunes_search_app",
    "before": [{
      "url": "https://itunes.apple.com/search?term=mclusky&country=gb",
      "method": "GET"
    }],
    "request": {
      "url": "https://itunes.apple.com/search?term=mclusky&country=gb",
      "method": "GET"
    },
    "response": {
      "statusCode": 200,
      "body": {
        "resultCount": "Joi.number().integer()",
        "results": [ { "trackName": "Joi.string()", "collectionName": "Joi.string()" } ]
      }
    }
  }
]
```

To test the contract as a consumer you can `POST` it to the running server, e.g:

```
$ curl -X POST --silent http://localhost:25863/api/contracts -H 'Content-Type: application/json' -d @contracts.json
[
  {
    "name": "itunes/search_by_term_and_country",
    "consumer": "itunes_search_app",
    "status": "Pass",
    "error": null
  }
]

```

Or you can use `jackal` as a client:

```
jackal send ./contracts.json http://localhost:25863/api/contracts
```
