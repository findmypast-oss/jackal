# Jackal

[![npm](https://img.shields.io/npm/v/jackal.svg)](https://www.npmjs.com/package/jackal)
[![Build](https://img.shields.io/travis/findmypast-oss/jackal.svg)](https://travis-ci.org/findmypast-oss/jackal)
[![Coveralls](https://img.shields.io/coveralls/findmypast-oss/jackal.svg)](https://coveralls.io/github/findmypast-oss/jackal)
[![License](https://img.shields.io/github/license/findmypast-oss/jackal.svg)](https://github.com/findmypast-oss/jackal/blob/master/LICENSE)

Jackal is a consumer-driven contracts microservice designed to prevent breaking API changes being released by either consumers or providers of APIs.

## Development

Please see the [Jackal Development Guide](./docs/development.md)

## API

Please see the [Jackal API Guide](./docs/api.md)

## Usage

#### Local

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
