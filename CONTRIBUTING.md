# 開発者ガイド

<details>
<summary>Docker の場合</summary>

## 1. 必要なファイルのリネーム

- config.yml ファイルの生成

```bash
cp config.yml.sample config.yml
```

- .env ファイルの生成

```bash
cp .env.sample .env
```

---

## 2. mount してある log ファイル等を local で生成する

- docker_init ファイルは， docker フォルダ直下にあります

---

### Windows の方

docker_init.bat を実行してください。

文字化け等が発生する場合。

- UTF-8 → shift-jis
- LF → CRLF

---

### mac ，linux の方

```bash
sh docker_init.sh
```

## 3. config.yml の DB に関する記述を変更する

```yaml
dbOptions:
  host: 'db'
  port: 3306
  user: 'user'
  password: 'pass'
  database: 'Entering_And_Leaving_The_Room'
```

---

## 4. **docker で動かす**

```bash
docker-compose up -d --build
```

---

## 5. database の初期化とテストデータ挿入

パスワードは表示されます。

```bash
docker-compose exec db bash
sh init_migrate_db.sh
```

---

## 6. Redpen の実行

```bash
docker start redpen
```

`Redpen` というフォルダに結果が出力されます。

---

## 7. Textlint の実行

```bash
sh textlint.sh
```

`Textlint` というフォルダに結果が出力されます。

自動で修正する場合は `textlint --fix ファイル名` で直す事が出来ますが、 textlint が自動修正できるモノに限られます。

詳細はログを参照してください。

---
</details>
<details>
<summary>Docker で開発しない人向け</summary>

## 1. config.ts を変更

- config.ts ファイルの生成

```bash
cp config.yml.sample config.yml
```

---

## 2. config.yml に MySQL の情報を書く

```yaml
dbOptions:
  host: '127.0.0.1'
  port: 3306
  user: {ユーザ名}
  password: {パスワード}
  database: {DB名}
```

---

## 3. DB をマイグレート

```bash
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

## 4. Node.js を動かす

- 必要な module をインストール

```bash
npm install
```

- dev モードで実行

```bash
npm run dev
```

---

## 5. Docker 使用者の 7. に従う

[使い方](#7-textlint-の実行)
