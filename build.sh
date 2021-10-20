#!/bin/bash

ARGS=("$@")
BUILD_NUMBER_NEW="${ARGS[0]}"

echo "Firefox Manifest v2 zio folder generate"
./release.sh $BUILD_NUMBER_NEW 2

echo "Chrome Manifest v2 zio folder generate"
./release.sh $BUILD_NUMBER_NEW 3