docker login -u $DOCKER_USERNAME -p $DOCKER_PASSWORD
TAG=$(git describe --exact-match HEAD)
VALIDTAG="v([0-9]*)\.([0-9]*)\.([0-9]*)"

if [[ "$TAG" =~ $VALIDTAG ]]; then
  echo "Publishing tagged branch $TAG"

  docker tag local/jackal findmypast/jackal:$TAG
  docker tag local/jackal findmypast/jackal:latest
  docker push findmypast/jackal:$TAG
  docker push findmypast/jackal:latest
fi
