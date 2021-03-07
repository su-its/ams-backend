# どうやってdockerで開発するのか

## 1. 必要なファイルのリネーム

- config.tsファイルの生成
`cp config.ts.sample config.ts`

- .envファイルの生成
`cp .env.sample .env`

---

## 2. mountしてあるlogファイル等をlocalで生成する

docker_initファイルは、dockerフォルダ直下にあります

---

### windowsの方

docker_init.batを実行してください

文字化け及び改行コードエラーが発生する場合

- UTF-8 → shift-jis
- LF → CRLF

---

### mac、linuxの方

```[bash]
sh docker_init.sh
```

## 3. config.tsのDBに関する記述を変更する

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

## 4. **dockerで動かす**

例： `docker-compose up -d --build`

---

## 5. databaseの初期化とテストデータ挿入

パスワードは表示されます

- `docker-compose exec db bash`
- `sh init_migrate_db.sh`

---

## Dockerで開発しない人向け

### 1. config.tsを変更

- config.tsファイルの生成
`cp config.ts.sample config.ts`

---

### 2. config.tsにMySQLの情報を書く

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

### 3. DBをマイグレート

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

### 4. node.jsを動かす

必要なmoduleをインストール

```[bash]
npm install
```

devモードで実行

```[bash]
npm run dev
```
