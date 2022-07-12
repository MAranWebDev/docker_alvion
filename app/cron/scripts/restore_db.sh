#!/bin/sh

## WARNING: This script will drop the database

## Arguments
backup=$1

## Check database connection status
docker exec alvion_db_1 bash -c "pg_isready -d ${DB_NAME} -U ${DB_USER}"
status=$?

## Check if database connected
if [ "$status" -eq 0 ]; then
  echo "Database connected, starting restore process."

  ## Drop old database
  docker exec alvion_db_1 bash -c "dropdb -f --if-exists -U ${DB_USER} ${DB_NAME}"
  echo "Dropping database"

  ## Create blank database
  docker exec alvion_db_1 bash -c "createdb -U ${DB_USER} ${DB_NAME}"
  echo "Creating blank database."

  ## Restore database with specific backup. MAJ: fix psql requires -i to work
  docker exec -i alvion_db_1 bash -c "psql -1 --set ON_ERROR_STOP=on -U ${DB_USER} ${DB_NAME}" </dumps/$backup
  echo "Restore process finished."
fi
