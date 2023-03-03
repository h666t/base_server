#!/bin/sh

sudo pm2 stop 0 &&
sudo git pull &&
sudo pm2 restart 0
