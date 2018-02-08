docker login -u $DOCKER_USER -p $DOCKER_PASS
TAG=$(git describe --exact-match HEAD)
VALIDTAG="v([0-9]*)\.([0-9]*)\.([0-9]*)"

if [[ "$TAG" =~ $VALIDTAG ]]; then
  echo "Publishing tagged branch $TAG"

  docker tag local/jackal findmypast/jackal:$TAG
  docker tag local/jackal findmypast/jackal:latest
  docker push findmypast/jackal:$TAG
  docker push findmypast/jackal:latest
fi
