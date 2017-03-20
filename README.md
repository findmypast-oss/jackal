# Jackal

[![Build](https://img.shields.io/travis/findmypast-oss/jackal.svg)](https://travis-ci.org/findmypast-oss/jackal)
[![Coveralls](https://img.shields.io/coveralls/findmypast-oss/jackal.svg)](https://coveralls.io/github/findmypast-oss/jackal)
[![License](https://img.shields.io/github/license/findmypast-oss/jackal.svg)](https://github.com/findmypast-oss/jackal/blob/master/LICENSE)

Jackal is a consumer-driven contracts microservice designed to prevent breaking API changes being released by either consumers or providers of APIs.

## Testing

Jackal uses [Node TAP](http://www.node-tap.org/basics/) for unit tests, [ESLint](http://eslint.org/) for linting and [NYC](https://github.com/istanbuljs/nyc) for coverage reports.

Tests can be run using the `npm test` command. ESLint will run prior to the tests being run, _all_ linting errors __and__ warnings should be fixed prior to pushing changes. HTML coverage reports will be generated and can be viewed by opening `/path/to/jackal/coverage/lcov-report/index.html` in a browser, a text summary will be printed after the tests have executed.
