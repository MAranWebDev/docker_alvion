#!/bin/sh

## Header
. /cron/templates/header.sh "upload_xml"

## XML NOW
if [ ! -z "$NOW_HOST" ]; then
  ## Run only if env $NOW_HOST exists
  . /cron/templates/run_node.sh "uploadXmlNow"
fi

## Footer
. /cron/templates/footer.sh
