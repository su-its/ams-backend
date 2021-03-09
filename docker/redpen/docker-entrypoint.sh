#!/bin/sh

# mdファイルをループ
for file in /redpen/*.md ; do
    # *.mdというファイルが存在した場合の対処
    [ -f "$file" ] || continue

    # Redpenを使用
    redpen -c /redpen/docs/config/Redpen-config.xml -f markdown -r plain "$file"
    echo "$file"
done
