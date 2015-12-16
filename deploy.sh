#!/bin/bash

set -e

echo -e "Deploying to production... "

echo -e " -> creating app directories"
echo -e " -> compiling javascript and sass into app"
gulp # this generates app/js and app/css
mv index.html app/index.html

rev=$(git rev-parse --short HEAD)

echo -e " -> setting up deploy repo"
cd app
git init

git config user.name "Travis CI"
git config user.email "joshua.sandlin@gmail.com"

git add .

echo -e " -> committing app deployment"
git commit -m "Deploy to GitHub Pages" -a

echo -e " -> pushing app deployment"
git remote add upstream "https://$GH_TOKEN@github.com/dydx/jeopardy.git"
git fetch upstream
git reset upstream/gh-pages

echo -e " -> sprinkling on magic dust"
touch .

git add -A .
git commit -m "GitHub Pages deployed on ${rev}" -a
git push -q upstream HEAD:gh-pages

echo -e "Production app is deployed (hopefully!)"
