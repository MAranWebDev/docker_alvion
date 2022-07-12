#!/bin/sh

## Header
. /cron/templates/header.sh "delete_dumps"

## script ======================================================

## Delete sql dumps older than 1 day
find /dumps -name "*.sql" -type f -mtime +1 -delete
echo "/dumps folder cleaned."

## script ======================================================

## Footer
. /cron/templates/footer.sh
