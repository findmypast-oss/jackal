#!/bin/bash

check_exit_code() {
  EXIT=$?

  if [ "$EXIT" -ne "0" ]
  then
    exit $EXIT
  fi

  return
}

OUTPUT=`node index send http://jackal:25863 ./test/docker/single_endpoint.json`
echo $OUTPUT
echo $OUTPUT | grep -q "passed for itunes_search_app against itunes"
check_exit_code

OUTPUT=`node index send http://jackal:25863 ./test/docker/failing_endpoint.json 2>&1`
echo $OUTPUT
echo $OUTPUT | grep -Pq "Failure - not all contracts passed.*Error: Request failed: getaddrinfo ENOTFOUND failing.endpoint failing.endpoint:443"
check_exit_code

OUTPUT=`node index send http://jackal:25863 ./test/docker/multiple_endpoint.json`
echo $OUTPUT
echo $OUTPUT | grep -q "search_by_term_and_country-OK passed.*lookup_by_id-OK passed"
check_exit_code

OUTPUT=`node index send http://jackal:25863 ./test/docker/invalid_endpoint.json`
echo $OUTPUT
echo $OUTPUT | grep -q "One or more contracts are invalid.*RequestValidationError.*\"baseUrl\" is required.*ResponseValidationError.*\"statusCode\" must be a number"
check_exit_code

OUTPUT=`node index send http://jackal:25863 ./test/docker/no_contract.json 2>&1`
echo $OUTPUT
echo $OUTPUT | grep -q "Missing contract file ./test/docker/no_contract.json"
check_exit_code
