#!/bin/bash
sudo yum erase codedeploy-agent
cd /opt
sudo rm -rf codedeploy-agent
cd
sudo rm -rf express-app
sudo ./install auto
#Stopping existing node servers
echo "Stopping any existing node servers"
pkill node
