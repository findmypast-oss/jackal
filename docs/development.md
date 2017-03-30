# Jackal Development Guide

## Testing

Jackal uses [Node TAP](http://www.node-tap.org/basics/) for unit tests, [ESLint](http://eslint.org/) for linting and [NYC](https://github.com/istanbuljs/nyc) for coverage reports.

Tests can be run using the `npm test` command. ESLint will run prior to the tests being run, _all_ linting errors __and__ warnings should be fixed prior to pushing changes. HTML coverage reports will be generated and can be viewed by opening `/path/to/jackal/coverage/lcov-report/index.html` in a browser, a text summary will be printed after the tests have executed.

Jackal uses [Mocha](https://mochajs.org/) and [Chai](http://chaijs.com/) for integration tests. In due course we will probably migrate _all_ unit tests to use Mocha & Chai also, however this is not currently prioritised.

## Contributing

If you would like to contribute to Jackal, we welcome pull requests and will aim to review them as fast as we can.

## Releasing

For developers with contributor status, every push results in an updated `latest` image in [Dockerhub](https://hub.docker.com/r/findmypast/jackal/). Once you decided to create a new release based on [semver](http://semver.org/) run the following to create a tag and bump the `package.json` version:

```
npm version [ patch | minor | major ]
```

Then to push the changes and trigger a deploy:

```
git push && git push --tags
```

This will result in a new [github release](https://github.com/findmypast-oss/jackal/releases), new [npm release](https://www.npmjs.com/package/jackal) and a new [Dockerhub tagged image](https://hub.docker.com/r/findmypast/jackal/tags/).
