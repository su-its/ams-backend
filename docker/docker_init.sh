#!/bin/sh

# mysqlのログフォルダ作成
cd MySQL
mkdir db
mkdir logs

# mysqlのログファイル作成
cd logs
touch mysqld.log
touch mysql-error.log
