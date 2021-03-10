#!/bin/sh

# 出力先ディレクトリの作成
mkdir -p Redpen

# 再帰的にmdファイルを探す(node_modules以下のディレクトリは無視)
search_data=$(find . \( -type d -and -name 'node_modules' -and -prune \) -or \( -name "*.md" \))

# mdファイルをループ(残ってしまった./node_modulesはスキップするようにした)
for file in $search_data; do
    if [ $file = './node_modules' ]; then
        continue
    fi
    redpen -t info -c ./docs/config/Redpen-config.xml -f markdown -r plain2 $file >>Redpen/Result.txt
done
