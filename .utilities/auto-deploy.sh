#!/bin/bash
echo -e "Deploying to Production...\n"

cd $HOME
git config --global user.email "travis@travis-ci.org"
git config --global user.name "travis-ci"
git clone --quiet --branch=gh-pages https://${GH_TOKEN}@github.com/dydx/jeopardy gh-pages > /dev/null

cd gh-pages
git rm -rf ./
cp -Rf $HOME/* ./
git add -f .
git commit -m "Latest production deploy from $TRAVIS_BUILD_NUMBER auto-pushed to gh-pages"
git push -fq origin gh-pages > /dev/null

echo -e "Production is deployed"
