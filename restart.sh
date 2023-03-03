#!/bin/sh

sudo pm2 stop 0 &&
git pull -f &&
sudo pm2 restart 0 && 
sudo pm2 logs 0
