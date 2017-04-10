# Jackal

[![npm](https://img.shields.io/npm/v/jackal.svg)](https://www.npmjs.com/package/jackal)
[![npm](https://img.shields.io/npm/dm/jackal.svg)](https://www.npmjs.com/package/jackal)
[![Build](https://img.shields.io/travis/findmypast-oss/jackal.svg)](https://travis-ci.org/findmypast-oss/jackal)
[![Coverage](https://coveralls.io/repos/github/findmypast-oss/jackal/badge.svg?branch=master)](https://coveralls.io/github/findmypast-oss/jackal?branch=master)
[![Known Vulnerabilities](https://snyk.io/test/github/findmypast-oss/jackal/badge.svg)](https://snyk.io/test/github/findmypast-oss/jackal)
[![Contributors](https://img.shields.io/github/contributors/findmypast-oss/jackal.svg)](https://github.com/findmypast-oss/jackal/graphs/contributors)
[![License](https://img.shields.io/github/license/findmypast-oss/jackal.svg)](https://github.com/findmypast-oss/jackal/blob/master/LICENSE)

__NOTE:__ Jackal is currently in alpha and under active development, as such the API should not yet be considered stable. Currently we anticipate at least one major API change prior to reaching a 1.0.0 release, and this document will be updated to reflect any API changes we make.

---------------------------

Jackal is a consumer-driven contracts microservice designed to prevent breaking API changes being released by either consumers or providers of APIs.

## Development

Please see the [Jackal Development Guide](https://github.com/findmypast-oss/jackal/blob/master/docs/development.md)

## API

Please see the [Jackal API Guide](https://github.com/findmypast-oss/jackal/blob/master/docs/api.md)

## Client

Please see the [Jackal Client Guide](https://github.com/findmypast-oss/jackal/blob/master/docs/client.md)

## Configuration

Please see the [Jackal Config Guide](https://github.com/findmypast-oss/jackal/blob/master/docs/config.md)

## Quickstart Guide

### Local

To install Jackal

```
npm i -g jackal
```

To start a local instance of Jackal with the [default config](./examples/config.json):

```
jackal start
```

Alternatively, to specify a custom configuration file:

```
// to use a custom configuration file
jackal start -c /path/to/custom/config.json
```

Make sure to define a custom configuration file:

```yaml
jackal:
  baseUrl: 'http://localhost'
  port: 25863
logger:
  environment: development
statsD:
  host: localhost
  port: 8125
  prefix: jackal
db:
  path: db.json
reporters:
  pretty: true
  teamcity: false
quiet: false
```

Jackal should now be available at `http://localhost:25863`, a health endpoint is provided at `/health`

### Docker

To start a dockerised instance of Jackal with the [default config](./examples/config.json):

```
docker run -p 25863:25863 findmypast/jackal
```

Jackal should now be available at `http://localhost:25863`, a health endpoint is provided at `/health`

### Testing Contracts as a Consumer

Make sure to define a contracts file, e.g:

```yaml
itunes_search_app:                # consumer name
  itunes:                         # provider name
    search_by_term_and_country:   # api endpoint name
      OK:                         # scenario name
        request:                  # request object (follows the same options as https://github.com/request/request#requestoptions-callback)
          url: 'https://itunes.apple.com/search?term=mclusky&country=gb'
          method: GET
        response:
          statusCode: 200
          body:                   # body uses Joi type definitions (https://github.com/hapijs/joi)
            resultCount: 'Joi.number().integer()'
            results:
              - trackName: Joi.string()
                collectionName: Joi.string()

```

To test the contracts as a consumer you can `POST` them to the running server, e.g:

To send a YAML contracts file using the client
```bash
$ jackal send /path/to/contracts.yaml
```

You can also specify the host url and port to run against
```bash
$ jackal send /path/to/contracts.yaml -b http://jackal-server -p 1234
```

The client also supports JSON contracts
```bash
$ jackal send /path/to/contracts.json
```

To send a JSON contracts file using curl
```bash
$ curl -X POST --silent http://localhost:25863/api/contracts -H 'Content-Type: application/json' -d @contracts.json
```

You should then receive a JSON array in response:
```json
[
  {
    "name": "itunes/search_by_term_and_country",
    "consumer": "itunes_search_app",
    "status": "Pass",
    "error": null
  }
]
```

### Testing Contracts as a Provider

To test the contracts as a provider you can do a `GET` request to the running server, eg:

To run contracts for a provider using the client
```bash
$ jackal run <provider_name>
```

You should then receive a JSON array in response:
```json
[
  {
    "name": "itunes/search_by_term_and_country",
    "consumer": "itunes_search_app",
    "status": "Pass",
    "error": null
  }
]
```
