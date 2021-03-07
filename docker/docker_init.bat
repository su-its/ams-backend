@echo on
rem MariaDBのログフォルダ作成
cd MariaDB
mkdir db
mkdir logs

rem MariaDBのログファイル作成
cd logs
echo "">mysqld.log
echo "">mysql-error.log

PAUSE
