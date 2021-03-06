#!/bin/sh

# MariaDB起動
nohup mysqld &

# 入退室時間のテーブル
mysqldump -h 127.0.0.1 -u user -p pass < create_table_access_logs.sql

# 入室中のテーブル
mysqldump -h 127.0.0.1 -u user -p pass < create_table_in_room_users.sql

# メンバのテーブル
mysqldump -h 127.0.0.1 -u user -p pass < create_table_member_list.sql

# スタブデータの注入
mysqldump -h 127.0.0.1 -u user -p pass < insert_test_data.sql
