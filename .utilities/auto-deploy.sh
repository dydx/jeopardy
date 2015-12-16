#!/bin/bash

set -e

echo -e "Deploying to production... "

mkdir out
cp index.html out/index.html
cp -r build out/build
cd out
git init

git config user.name "Travis CI"
git config user.email "joshua.sandlin@gmail.com"

git add .
git commit -m "Deploy to GitHub Pages"

git push --forge --quiet "https://${GH_TOKEN}@${GH_REF}" master:gh-pages > /dev/null 2>&1

echo -e "Production app is deployed"
