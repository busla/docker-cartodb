#!/bin/bash

PORT=3000
SUBDOMAIN=dev

echo "127.0.0.1 ${SUBDOMAIN}.cartodb.localhost" | sudo tee -a /etc/hosts

service postgresql start
service redis-server start
service varnish start

cd /Windshaft-cartodb
node app.js development &

cd /CartoDB-SQL-API
node app.js development &

cd /cartodb
source /usr/local/rvm/scripts/rvm
bundle exec script/restore_redis
bundle exec script/resque &
bundle exec rails s -p $PORT

