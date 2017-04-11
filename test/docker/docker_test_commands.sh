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

# OUTPUT=`node index send http://jackal:25863 ./test/docker/failing_endpoint.json`
# echo $OUTPUT
# echo $OUTPUT | grep -q "search_by_term_and_country-OK passed.*lookup_by_id-OK passed"
# check_exit_code

OUTPUT=`node index send http://jackal:25863 ./test/docker/multiple_endpoint.json`
echo $OUTPUT
echo $OUTPUT | grep -q "search_by_term_and_country-OK passed.*lookup_by_id-OK passed"
check_exit_code
