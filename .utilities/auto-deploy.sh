#!/bin/bash

set -e

echo -e "Deploying to production... "

rm -rf out || exit 0;
mkdir out;

# runs npm build and populates ./app with index.html, js, and css
./compile.sh

cd out
git init

git config user.name "Travis CI"
git config user.email "joshua.sandlin@gmail.com"

git add .
git commit -m "Deploy to GitHub Pages"

git push --forge --quiet "https://${GH_TOKEN}@${GH_REF}" master:gh-pages > /dev/null 2>&1

echo -e "Production app is deployed"
