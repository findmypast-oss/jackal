# Jackal

[![npm](https://img.shields.io/npm/v/jackal.svg)](https://www.npmjs.com/package/jackal)
[![Build](https://img.shields.io/travis/findmypast-oss/jackal.svg)](https://travis-ci.org/findmypast-oss/jackal)
[![Coveralls](https://img.shields.io/coveralls/findmypast-oss/jackal.svg)](https://coveralls.io/github/findmypast-oss/jackal)
[![License](https://img.shields.io/github/license/findmypast-oss/jackal.svg)](https://github.com/findmypast-oss/jackal/blob/master/LICENSE)

Jackal is a consumer-driven contracts microservice designed to prevent breaking API changes being released by either consumers or providers of APIs.

## Running

### Docker

To start the jackal service running on port `25863`:

`docker run -p 25863:25863 findmypast/jackal`

## Testing

Jackal uses [Node TAP](http://www.node-tap.org/basics/) for unit tests, [ESLint](http://eslint.org/) for linting and [NYC](https://github.com/istanbuljs/nyc) for coverage reports.

Tests can be run using the `npm test` command. ESLint will run prior to the tests being run, _all_ linting errors __and__ warnings should be fixed prior to pushing changes. HTML coverage reports will be generated and can be viewed by opening `/path/to/jackal/coverage/lcov-report/index.html` in a browser, a text summary will be printed after the tests have executed.

## Releasing

Every push results in an updated `latest` image in [Dockerhub](https://hub.docker.com/r/findmypast/jackal/). Once you decided to create a new release based on [semver](http://semver.org/) run the following to create a tag and bump the `package.json` version:

```
npm version [ patch | minor | major ]
```

Then to push the changes and trigger a deploy:

```
git push && git push --tags
```

This will result in a new [github release](https://github.com/findmypast-oss/jackal/releases), new [npm release](https://www.npmjs.com/package/jackal) and a new [Dockerhub tagged image](https://hub.docker.com/r/findmypast/jackal/tags/).
