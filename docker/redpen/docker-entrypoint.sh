#!/bin/sh

# 出力先ディレクトリの作成
mkdir Redpen

# mdファイルをループ
for file in *.md; do
    # *.mdというファイルが存在した場合の対処
    [ -f "$file" ] || continue
    redpen -t info -c /redpen/docs/config/Redpen-config.xml -f markdown -r plain2 "$file">>Redpen/Result.txt
done
