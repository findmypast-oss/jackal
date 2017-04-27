#!/bin/bash

check_zero_exit_code() {
  EXIT=$?

  if [ "$EXIT" -ne "0" ]
  then
    echo "Docker Tests Failed"
    exit $EXIT
  fi

  return
}

# Send command

OUTPUT=`node index send http://jackal:25863 ./test/docker/single_endpoint.json`
echo $OUTPUT
echo $OUTPUT | grep -q "passed for itunes_search_app against itunes"
check_zero_exit_code

OUTPUT=`node index send http://jackal:25863 ./test/docker/failing_endpoint.json 2>&1`
echo $OUTPUT
echo $OUTPUT | grep -Pq "Failures Exist.*Error: Request failed: getaddrinfo ENOTFOUND failing.endpoint failing.endpoint:443"
check_zero_exit_code

OUTPUT=`node index send http://jackal:25863 ./test/docker/multiple_endpoint.json`
echo $OUTPUT
echo $OUTPUT | grep -q "search_by_term_and_country OK passed.*lookup_by_id OK passed"
check_zero_exit_code

OUTPUT=`node index send http://jackal:25863 ./test/docker/invalid_endpoint.json`
echo $OUTPUT
echo $OUTPUT | grep -q "One or more contracts are invalid.*RequestValidationError.*\"baseUrl\" is required.*ResponseValidationError.*\"statusCode\" must be a number"
check_zero_exit_code

OUTPUT=`node index send http://jackal:25863 ./test/docker/no_contract.json 2>&1`
echo $OUTPUT
echo $OUTPUT | grep -q "Missing contract file ./test/docker/no_contract.json"
check_zero_exit_code

OUTPUT=`node index send http://jackal:25863 ./test/docker/no_contract.json --skip-missing-contract 2>&1`
echo $OUTPUT
echo $OUTPUT | grep -q "^Skipping no contracts, file not found: ./test/docker/no_contract.json$"
check_zero_exit_code

# Run command

node index send http://jackal:25863 ./test/docker/single_endpoint.json 1>/dev/null
OUTPUT=`node index run http://jackal:25863 itunes`
echo $OUTPUT
echo $OUTPUT | grep -q "search_by_term_and_country OK passed for itunes_search_app against itunes"
check_zero_exit_code

node index send http://jackal:25863 ./test/docker/failing_endpoint.json 1>/dev/null 2>/dev/null
OUTPUT=`node index run http://jackal:25863 failing_itunes 2>&1`
echo $OUTPUT
echo $OUTPUT | grep -q "No contracts exist for provider: failing_itunes"
check_zero_exit_code

OUTPUT=`node index run http://jackal:25863 missing_provider 2>&1`
echo $OUTPUT
echo $OUTPUT | grep -q "No contracts exist for provider: missing_provider"
check_zero_exit_code

# Stats command

OUTPUT=`node index stats http://jackal:25863`
echo $OUTPUT
echo $OUTPUT | grep -Pq "consumerCount: \d.*consumers: - itunes_search_app providerCount: \d.*providers: - itunes apiCount: \d.* contractCount: \d"
check_zero_exit_code

echo "Docker Tests Passed"
