#!/bin/bash

ARGS=("$@")
ENV="${ARGS[0]}"
BUILD_NUMBER_NEW="${ARGS[1]}"

# Development Build
# Via: https://developer.chrome.com/docs/webstore/cws-dashboard-distribution/#publishing-a-test-version
echo "Generator Development: Firefox Manifest v2 zip file"
./release.sh $ENV $BUILD_NUMBER_NEW 2

echo "Generator Development: Chrome Manifest v3 zip file"
./release.sh $ENV $BUILD_NUMBER_NEW 3

# Production Build
echo "Generator: Firefox Manifest v2 zip file"
./release.sh $ENV $BUILD_NUMBER_NEW 2

echo "Generator: Chrome Manifest v3 zip file"
./release.sh $ENV $BUILD_NUMBER_NEW 3