#!/bin/bash

set -e

echo -e "Deploying to production... "

# make app folder
# move index.html into app folder
# run npm build to create app/js and app/css
# cd into app
# create git repo
# add everything in app
# commit with build ID
# force push

mkdir app
mv index.html app/index.html
npm build # this compiles the contents of build into app
cd app
git init

git config user.name "Travis CI"
git config user.email "joshua.sandlin@gmail.com"

git add .
git commit -m "Deploy to GitHub Pages"

git push --forge --quiet "https://${GH_TOKEN}@${GH_REF}" master:gh-pages > /dev/null 2>&1

echo -e "Production app is deployed"
