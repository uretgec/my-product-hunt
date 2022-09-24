#!/bin/bash

# Usage: ./release new-build-version manifest-version
# Usage: ./release 1.0.6 3
# Before run: chmod a+x release.sh
# Local Variables
ARGS=("$@")
WHEREIAM=$(pwd)
BUILD_NUMBER_OLD="$(cat $WHEREIAM/VERSION)"
ENV="${ARGS[0]}" # dev|prod
BUILD_NUMBER_NEW="${ARGS[1]}"
MANIFEST_VERSION="${ARGS[2]}" # 3: Chrome, 2: Firefox

# sed Checker
if [ -x "$(command -v sed)" ]
then

    sed -e 's|BUILD_NUMBER|'$BUILD_NUMBER_NEW'|g' $WHEREIAM/manifestv$MANIFEST_VERSION.template > $WHEREIAM/extension/manifest.json
    echo "Extension version updated from $BUILD_NUMBER_OLD to $BUILD_NUMBER_NEW"
    if [ "$ENV" == "prod" ]
    then
        echo $BUILD_NUMBER_NEW > $WHEREIAM/VERSION
        echo "VERSION file updated from $BUILD_NUMBER_OLD to $BUILD_NUMBER_NEW"
    else
        echo "VERSION file not updated"
    fi

else

    echo "sed command not found"

fi

# zip Checker
if [ -x "$(command -v zip)" ]
then
    mkdir -p $WHEREIAM/build/$ENV/$BUILD_NUMBER_NEW
    cd $WHEREIAM/extension
    zip -r $WHEREIAM/build/$ENV/$BUILD_NUMBER_NEW/my-product-hunt-$BUILD_NUMBER_NEW-v$MANIFEST_VERSION.zip * -x "*.DS_Store" -x "__MACOSX" -x "*_original.css"
    echo "Extension folder compressed: my-product-hunt-$BUILD_NUMBER_NEW-v$MANIFEST_VERSION.zip"

else

    echo "zip command not found"

fi

echo "Ready to upload"