#!/usr/bin/env bash

. ./scripts/startServers.sh

. ./scripts/stopServers.sh

echo "Invalid command: $1"
exit 1
