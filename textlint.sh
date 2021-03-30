#!/bin/bash

# 出力先ディレクトリの作成
mkdir -p Textlint

# 再帰的にmdファイルを探す(node_modules以下のディレクトリは無視)
search_data=$(find . \( -type d -and -name 'node_modules' -and -prune \) -or \( -name "*.md" \))

# mdファイルをループ(残ってしまった./node_modulesはスキップするようにした)
for file in $search_data; do
    if [ $file = './node_modules' ]; then
        continue
    fi
    #textlintを実行する
    node node_modules/textlint/bin/textlint.js $file >>Textlint/Result.txt
done
