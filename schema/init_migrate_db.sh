#!/bin/sh

# パスワードの情報を通知
echo 'パスワードはデフォルトで pass'

# 入退室時間のテーブル
mysql -u user -p Entering_And_Leaving_The_Room < create_table_access_logs.sql

# 入室中のテーブル
mysql -u user -p Entering_And_Leaving_The_Room < create_table_in_room_users.sql

# メンバのテーブル
mysql -u user -p Entering_And_Leaving_The_Room < create_table_member_list.sql

# スタブデータの注入
mysql -u user -p Entering_And_Leaving_The_Room < insert_test_data.sql
