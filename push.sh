#!/bin/sh

# yarn build &&
tsc &&
git add . &&
git commit -m 'update' &&
git push