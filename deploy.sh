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

echo -e " -> creating app directories"
echo -e " -> compiling javascript and sass into app"
gulp
mv index.html app/index.html

echo -e " -> setting up deploy repo"
cd app
git init

git config user.name "Travis CI"
git config user.email "joshua.sandlin@gmail.com"

git add .

echo -e " -> committing app deployment"
git commit -m "Deploy to GitHub Pages" -a

echo -e " -> pushing app deployment"
git push --force "https://${GH_TOKEN}@${GH_REF}" master:gh-pages > /dev/null 2>&1

echo -e "Production app is deployed (hopefully!)"
