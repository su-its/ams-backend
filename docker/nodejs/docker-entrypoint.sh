#!/bin/sh

# npmを7系に上げる
npm i -g npm@7

# 依存パッケージをインストール
npm install

# devサーバを起動
npm run dev
