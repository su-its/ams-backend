# どうやって docker で開発するのか

## 1. 必要なファイルのリネーム

- config.ts ファイルの生成
 `cp config.ts.sample config.ts`

- .env ファイルの生成
 `cp .env.sample .env`

---

## 2. mount してある log ファイル等を local で生成する

docker_init ファイルは， docker フォルダ直下にあります

---

### windows の方

docker_init.bat を実行してください

文字化け及び改行コードエラーが発生する場合

- UTF-8 → shift-jis
- LF → CRLF

---

### mac ，linux の方

```[bash]
sh docker_init.sh
```

## 3. config.ts の DB に関する記述を変更する

```[ts]
const dbOptions: ConnectionOptions = {
  host: 'db',
  port: 3306,
  user: 'user',
  password: 'pass',
  database: 'Entering_And_Leaving_The_Room',
  waitForConnections: true // set true
}
```

---

## 4. **docker で動かす**

例： `docker-compose up -d --build`

---

## 5. database の初期化とテストデータ挿入

パスワードは表示されます

- `docker-compose exec db bash`
- `sh init_migrate_db.sh`

---

## Docker で開発しない人向け

### 1. config.ts を変更

- config.ts ファイルの生成
 `cp config.ts.sample config.ts`

---

### 2. config.ts に MySQL の情報を書く

```[bash]
const dbOptions: ConnectionOptions = {
  host: 127.0.0.1,
  port: 3306,
  user: {ユーザ名},
  password: {パスワード},
  database: {DB名},
  waitForConnections: true // set true
}
```

---

### 3. DB をマイグレート

```[bash]
# スキーマフォルダに移動
cd schema

# 入退室時間のテーブル
mysql -u {ユーザ名} -p {DB名} < create_table_access_logs.sql

# 入室中のテーブル
mysql -u {ユーザ名} -p {DB名} < create_table_in_room_users.sql

# メンバのテーブル
mysql -u {ユーザ名} -p {DB名} < create_table_member_list.sql

# スタブデータの注入
mysql -u {ユーザ名} -p {DB名} < insert_test_data.sql
```

---

### 4. node.js を動かす

必要な module をインストール

```[bash]
npm install
```

dev モードで実行

```[bash]
npm run dev
```
