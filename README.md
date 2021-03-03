# ams-backend-nodejs

こちらが後ろで動作しています。

[reader-bridge](https://github.com/su-its/rdr-bridge)

---

## API Reference

Each path prefixed with `/v1/` like `/v1/access_logs`.

以下のような出力を想定しています。

- *Log*

```json5
{

  // 例
  "user_id": 1,                             // 学籍番号: number
  "entered_at": "2021-02-23T16:57:39.000Z", // 入室時: string
  "exited_at": "2021-02-23T17:32:50.000Z"   // 退室時: string
}
```

- *User*

```json5
{
  // 例
  "user_id": 1,                             // 学籍番号: number
  "entered_at": "2021-02-23T16:57:39.000Z"  // 入室時間: string
}
```

- *Err*

```json5
{
  // 例
  "message": "internal server error"  // エラーメッセージ: string
}
```

### /access_logs

- **GET** : returns an array of *Log*, or *Err*

### /room

- **POST** : accepts input from [rdr-bridge](https://github.com/su-its/rdr-bridge#%E3%82%A8%E3%83%B3%E3%83%89%E3%83%9D%E3%82%A4%E3%83%B3%E3%83%88%E3%81%B8%E9%80%81%E3%82%8Bjson), returns empty body. Always responses with status code 200.

### /users_in_room

- **GET** : returns an array of *User* or *Err*

### /users_in_room/:userId

- **GET** : returns *User* or *Err*
