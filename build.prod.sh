#!/bin/bash

ARGS=("$@")
BUILD_NUMBER_NEW="${ARGS[0]}"

./sh/build.sh "prod" $BUILD_NUMBER_NEW