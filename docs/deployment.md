# Deployment

## PM2のインストール(まだの場合)

```[bash]
npm install pm2 -g
```

## 新しくリリースする場合

```[bash]
cd /path/to/projectdir/
pm2 start ecosystem.config.js
pm2 startup
pm2 save
```

### 注意点

`config.ts` および `node_modules` フォルダを上書き・削除しないように注意してください
