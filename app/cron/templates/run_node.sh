#!/bin/sh

## Arguments
file=$1

## Check mode
if [ "$MODE" = "pro" ]; then
  ## Production mode
  node="node"
  script="/usr/src/app/build/tasks/${file}.js"
  echo "Using production mode."
else
  ## Development mode
  node="ts-node"
  script="/usr/src/app/src/tasks/${file}.ts"
  echo "Using development mode."
fi

## Run node script
docker exec alvion_server_1 bash -c "${node} ${script}"
echo "${file} node script finished."
