#!/usr/bin/env bash
cd /home/ubuntu/build
sudo nohup java -jar DeployServer-0.0.1-SNAPSHOT.jar > /dev/null 2> /dev/null < /dev/null &