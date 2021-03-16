# どうやって OpenAPI 用の HTML を作成するのか

## 要件

Node.js インストールまたは Docker 、 WSL 等使って、 node を利用出来るようにしておく。

---

## インストール

```bash
npm -g install redoc-cli
```

## 実行コマンド

```bash
redoc-cli bundle ディレクトリ+ファイル名
```

---

## 今回使用したプログラムのリポジトリ

[redoc](https://github.com/Redocly/redoc)
