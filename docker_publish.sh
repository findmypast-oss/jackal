# docker login -e $DOCKER_EMAIL -u $DOCKER_USER -p $DOCKER_PASS
BRANCH=$(git rev-parse --abbrev-ref HEAD)

if [ "$BRANCH" != "master" ]; then
  JACKAL_VERSION=v$(node -e "console.log(require('./package.json').version);")

  echo "Publishing tagged branch"
  echo JACKAL_VERSION

  docker tag local/jackal findmypast/jackal:$JACKAL_VERSION
  docker push findmypast/jackal:$JACKAL_VERSION
  docker tag local/jackal findmypast/jackal:latest
  docker push findmypast/jackal:latest
  exit 0
fi

if [ "$BRANCH" == "master" ]; then
  echo "Publishing master branch"

  docker tag local/jackal findmypast/jackal:latest
  docker push findmypast/jackal:latest
  exit 0
fi
