#!/bin/sh

## Header
. /cron/templates/header.sh "dump_db"

## script ======================================================

## Check database connection status
docker exec alvion_db_1 bash -c "pg_isready -d ${DB_NAME} -U ${DB_USER}"
status=$?

## Check if database connected
if [ "$status" -eq 0 ]; then
  echo "Database connected, starting backup process."

  ## Make database backup
  docker exec alvion_db_1 bash -c "pg_dump -U ${DB_USER} ${DB_NAME}" >/dumps/alvion_$(date +"%Y%m%dT%H%M%S%Z").sql
  echo "Backup process finished."
fi

## script ======================================================

## Footer
. /cron/templates/footer.sh
