#!/bin/sh

## Header
. /cron/templates/header.sh "download_xml"

## XML GMO
if [ ! -z "$GMO_HOST" ]; then
  ## Run only if env $GMO_HOST exists
  . /cron/templates/run_node.sh "downloadXmlGmo"
fi

## XML NOW
if [ ! -z "$NOW_HOST" ]; then
  ## Run only if env $NOW_HOST exists
  . /cron/templates/run_node.sh "downloadXmlNow"
fi

## Footer
. /cron/templates/footer.sh
