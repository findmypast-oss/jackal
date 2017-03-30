# Jackal Result Guide

__NOTE:__ Jackal is currently in alpha and so the API is not yet considered fully stable. Currently we anticipate at least one major API change prior to reaching a 1.0.0 release, and this document will be updated to reflect any API changes we make.

Jackal returns an array of result objects in JSON, where each result within the array is an object with the following format:

```
{
  name:       STRING
  consumer:   STRING
  status:     STRING
  error:      STRING OR NULL
}
```

The following applies:

- The `name` and `consumer` fields identify the contract
- The `status` is either `Pass` or `Fail` depending on whether the contract was executed successfully
- The `error` field is `null` if the contract was executed successfully and a string if it failed
