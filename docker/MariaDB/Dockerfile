FROM mariadb:10.1.48

LABEL maintainer="Satake Ryota <satake00157@gmail.com>" \
    description="MariaDB10.1.48のDockerfile"

# timezoneに関するリポジトリを取得
RUN apt-get update && \
    apt-get install -y tzdata

# 日本時間に設定
RUN rm /etc/localtime && \
    echo Asia/Tokyo > /etc/timezone \
    dpkg-reconfigure -f noninteractive tzdata

# logフォルダとファイルを生成
RUN mkdir -p /var/log/mysql && \
    touch /var/log/mysql/mysql-error.log && \
    touch /var/log/mysql/mysqld.log
