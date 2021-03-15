#!/bin/bash

# 再帰的にmdファイルを探す(node_modules以下のディレクトリは無視)
search_data=$(find ../ \( -type d -and -name 'node_modules' -and -prune \) -or \( -name "*.md" \))
declare -a data=()
# mdファイルをループ(残ってしまった./node_modulesはスキップするようにした)
for file in $search_data; do
    if [ $file != '../node_modules' ]; then
        # ../ をトリム
        tmp=${file#../}
        # 配列に追加
        data+=($tmp)
        node ../node_modules/textlint/bin/textlint.js -f json $tmp | reviewdog -f=rdjson -reporter=github-pr-review
    fi
done
# 配列を出力
echo ${data[@]}
