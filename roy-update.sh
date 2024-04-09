#!/usr/bin/env sh
# If roy has updated somehow meaningfully, it's probably roy.mjs - this is a quick hack way to update that

INITIAL_COMMIT=$(git rev-list --max-parents=0 HEAD)
git reset --hard ${INITIAL_COMMIT}
curl https://raw.githubusercontent.com/dochne/roy/refs/heads/main/roy.mjs > roy.mjs
git add roy.mjs
git commit --amend --no-edit
git push --force
