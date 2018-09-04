#!/bin/sh

# Checkout autobuild branch
cd ..
git clone https://github.com/Adamant-im/adamant-erc20.git --branch autobuild --single-branch repo_autobuild
cd repo_autobuild

mv ../adamant-erc20/.dist/erc20_tokens.json ./build

git config --global user.email "travis@travis-ci.org"
git config --global user.name "Travis CI"
git remote add origin-master https://${AUTOBUILD_TOKEN}@github.com/Adamant-im/adamant-erc20.git > /dev/null 2>&1
git add ./build/erc20_tokens.json

# We don’t want to run a build for a this commit in order to avoid circular builds: 
# add [ci skip] to the git commit message
git commit --message "Snapshot autobuild N.$TRAVIS_BUILD_NUMBER [ci skip]"
git push origin-master