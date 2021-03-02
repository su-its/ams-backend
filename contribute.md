# どうやってdockerで開発するのか

## 必要なファイルのリネーム

- config.tsファイルの生成
`cp config.ts.sample config.ts`

- .envファイルの生成
`cp .env_copy .env`

---

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

## dockerで動かす

例： `docker-compose up -d --build`
