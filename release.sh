#!/bin/bash

# Usage: ./release new-build-version
# Usage: ./release 1.0.6
# Before run: chmod a+x runme.sh
# Local Variables
ARGS=("$@")
WHEREIAM=$(pwd)
BUILD_NUMBER_OLD="$(cat $WHEREIAM/VERSION)"
BUILD_NUMBER_NEW="${ARGS[0]}"

# sed Checker
if [ -x "$(command -v sed)" ]
then

    sed -e 's|BUILD_NUMBER|'$BUILD_NUMBER_NEW'|g' $WHEREIAM/manifest.template > $WHEREIAM/extension/manifest.json
    echo "Extension version updated from $BUILD_NUMBER_OLD to $BUILD_NUMBER_NEW"
    echo $BUILD_NUMBER_NEW > $WHEREIAM/VERSION
    echo "VERSION file updated from $BUILD_NUMBER_OLD to $BUILD_NUMBER_NEW"

else

    echo "sed command not found"

fi

# zip Checker
if [ -x "$(command -v zip)" ]
then

    zip -r $WHEREIAM/build/my-product-hunt-$BUILD_NUMBER_NEW.zip $WHEREIAM/extension -x "*.DS_Store" -x "__MACOSX"
    echo "Extension folder compressed: my-product-hunt-$BUILD_NUMBER_NEW.zip"

else

    echo "zip command not found"

fi

echo "Ready to upload"