# Jackal Validation Guide

__NOTE:__ Jackal is currently in alpha and so the API is not yet considered fully stable. Currently we anticipate at least one major API change prior to reaching a 1.0.0 release, and this document will be updated to reflect any API changes we make.

Jackal can be configured using a JSON file which should contain an object with the following format:

```
{
  logger:   {
    environment:  STRING    // OPTIONAL, DEFAULT: "development"
  }
  statsD: {
    host:         STRING    // OPTIONAL, DEFAULT: localhost
    port:         INTEGER   // OPTIONAL, DEFAULT: 8125
    prefix:       STRING    // OPTIONAL, DEFAULT: jackal
  }
}
```

The following applies:

- The `logger` and `statsD` objects are both optional
- The above properties are the defaults used, where either the object or the default properties are omitted, the above defaults will be used
