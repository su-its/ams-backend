@echo on
rem mysqlのログフォルダ作成
cd MySQL
mkdir db
mkdir logs

rem mysqlのログファイル作成
cd logs
echo "">mysqld.log
echo "">mysql-error.log

PAUSE
