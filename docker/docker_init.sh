#!/bin/sh

# MariaDBのログフォルダ作成
cd MariaDB
mkdir db
mkdir logs

# MariaDBのログファイル作成
cd logs
touch mysqld.log
touch mysql-error.log
