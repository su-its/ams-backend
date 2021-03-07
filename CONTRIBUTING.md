# どうやってdockerで開発するのか

## 必要なファイルのリネーム

- config.tsファイルの生成
`cp config.ts.sample config.ts`

- .envファイルの生成
`cp .env.sample .env`

---

## mountしてあるlogファイル等をlocalで生成する

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

## config.tsのDBに関する記述を変更する

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

## **dockerで動かす**

例： `docker-compose up -d --build`

---

## Dockerで開発しない人向け

- config.tsファイルの生成
`cp config.ts.sample config.ts`

### config.tsにMySQLの情報を書く

```[bash]
const dbOptions: ConnectionOptions = {
  host: 127.0.0.1,
  port: 3306,
  user: 'user',
  password: 'password',
  database: 'Entering_And_Leaving_The_Room',
  waitForConnections: true // set true
}
```

必要なmoduleをインストール

```[bash]
npm install
```

devモードで実行

```bash
npm run dev
```
