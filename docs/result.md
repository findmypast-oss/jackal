# Jackal Result Guide

__Note:__ Jackal is currently under development, while the API is not likely to change ahead of the 1.0.0 release nor should it be considered fully stable. If the API is updated this guide will be updated to reflect any change.

---------------

The Jackal API returns an array of results as part of the response body when Contracts are executed either by posting Contracts to the Consumer Endpoint or when Contracts for a specified Provider are executed when making a request to the Provider Endpoint.

The objects in the results array have the following shape:

```
{
  name:       STRING
  consumer:   STRING
  status:     STRING
  error:      STRING OR NULL
}
```

- The `name` and `consumer` fields identify the contract as well as the Consumer which defined it.
- The `status` is either `Pass` or `Fail` depending on whether the contract was executed successfully.
- The `error` field is always `null` when the contract executed successfully, if it failed then it will be the error message thrown when executing the contract.
