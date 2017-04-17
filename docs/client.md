# Jackal Client Guide

__NOTE:__ Jackal is currently in alpha and under active development, as such the API should not yet be considered stable. Currently we anticipate at least one major API change prior to reaching a 1.0.0 release, and this document will be updated to reflect any API changes we make.

## Global usage
```

  Usage: index [options] [command]


  Commands:

    start [options]                             Start the Jackal server
    send [options] <jackalUrl> <contractsPath>  Send the consumer's contracts in the specified file to the Jackal service
    run [options] <jackalUrl> <providerName>    Runs the provider's contracts stored in the database of the Jackal service
    dump [options] <jackalUrl>                  Dumps the database of the Jackal service
    stats [options] <jackalUrl>                 Gets usage stats from the running Jackal service

  Options:

    -h, --help     output usage information
    -V, --version  output the version number

```

## start
```
  Usage: start [options]

  Start the Jackal server

  Options:

    -h, --help                      output usage information
    -c, --config-path [configPath]  Pass a path to a config file, default ./jackal.json
```

## send
```
  Usage: send [options] <jackalUrl> <contractsPath>

  Send the consumer's contracts in the specified file to the Jackal service

  Options:

    -h, --help                 output usage information
    -r, --reporter [reporter]  Reporter for output [json|spec|teamcity]
    --skip-missing-contract    Do not execute tests if the contracts file is missing
```

## run
```
  Usage: run [options] <jackalUrl> <providerName>

  Runs the provider's contracts stored in the database of the Jackal service

  Options:

    -h, --help                        output usage information
    -r, --reporter [reporter]         Reporter for output [json|spec|teamcity]
    -p, --provider-url [providerUrl]  Base url of the provider, defaults to the original URL specified by the consumer contract

```

## dump
```
  Usage: dump [options] <jackalUrl>

  Dumps the database of the Jackal service

  Options:

    -h, --help                 output usage information
    -r, --reporter [reporter]  Reporter for output [json|pretty]
```

## stats
```
  Usage: stats [options] <jackalUrl>

  Gets usage stats from the running Jackal service

  Options:

    -h, --help                 output usage information
    -c, --consumer [consumer]  Consumer to retrieve current statistics for
    -p, --provider [provider]  Provider to retrieve current statistics for
    -r, --reporter [reporter]  Reporter for output [json|pretty]
```
