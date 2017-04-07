# Jackal Validation Guide

__NOTE:__ Jackal is currently in alpha and so the API is not yet considered fully stable. Currently we anticipate at least one major API change prior to reaching a 1.0.0 release, and this document will be updated to reflect any API changes we make.

Jackal can be configured using a JSON file or a YAML file containing a single config object.

In JSON, the config object should have the following format:
```
{
  db: {
    path:         STRING    // OPTIONAL, DEFAULT: db.json
  }
  jackal: {
    baseUrl:      STRING    // OPTIONAL, DEFAULT: http://localhost
    port:         INTEGER   // OPTIONAL, DEFAULT: 25863
  }
  logger:   {
    environment:  STRING    // OPTIONAL, DEFAULT: "development"
  }
  quiet:          BOOLEAN   // OPTIONAL, DEFAULT: false
  reporters: {
    pretty:       BOOLEAN   // OPTIONAL, DEFAULT: true
    teamcity:     BOOLEAN   // OPTIONAL, DEFAULT: false
  }
  statsD: {
    host:         STRING    // OPTIONAL, DEFAULT: localhost
    port:         INTEGER   // OPTIONAL, DEFAULT: 8125
    prefix:       STRING    // OPTIONAL, DEFAULT: jackal
  }
}
```

In YAML, the config object should have the following format:
```
db:
  path:         STRING      // OPTIONAL, DEFAULT: db.json
jackal:
  baseUrl:      STRING      // OPTIONAL, DEFAULT: http://localhost
  port:         INTEGER     // OPTIONAL, DEFAULT: 25863
logger:
  environment:  STRING      // OPTIONAL, DEFAULT: "development"
quiet:          BOOLEAN     // OPTIONAL, DEFAULT: false
reporters:
  pretty:       BOOLEAN     // OPTIONAL, DEFAULT: true
  teamcity:     BOOLEAN     // OPTIONAL, DEFAULT: false
statsD:
  host:         STRING      // OPTIONAL, DEFAULT: localhost
  port:         INTEGER     // OPTIONAL, DEFAULT: 8125
  prefix:       STRING      // OPTIONAL, DEFAULT: jackal
```

__Note:__ All config object properties (including nested) are optional, where they are not specified the defaults listed above will be used
