#!/bin/bash

set -e
export YARN_PRODUCTION=false
export NODE_OPTIONS=--openssl-legacy-provider

echo
echo "↔ Installing dependencies…"
echo
( set -x; yarn )

echo
echo
echo "🔨 Building embed-api…"
echo
( set -x; yarn workspace @widgetbot/embed-api build)

echo
echo
echo "🔨 Building react-embed…"
echo
( set -x; yarn workspace @widgetbot/react-embed build)

echo
echo
echo "🔨 Building html-embed…"
echo
( set -x; yarn workspace @widgetbot/html-embed build)

echo
echo
echo "🔨 Building embed…"
echo
( set -x; yarn workspace embed build)

echo
echo
echo "🔨 Building crate…"
echo
( set -x; yarn workspace @widgetbot/crate build)

echo
echo
echo "🔨 Building server…"
echo
( set -x; yarn workspace server build)

echo
echo "--------------------------------------------------------------------------------"
echo
echo "🎉 All packages have been built!"
echo
echo "If you haven't done so already then go to \`packages/server/data\`,"
echo "    copy \`config.template.yml\` to \`config.yml\` and set it up correctly."
echo
echo
echo "To run the server:"
echo
echo "    yarn workspace server start    -or-    cd packages/server && yarn start"
echo
echo
echo "To run the embed webserver:"
echo
echo "    yarn workspace embed start     -or-    cd packages/embed && yarn start"
echo
echo "--------------------------------------------------------------------------------"
echo
