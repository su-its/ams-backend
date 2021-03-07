FROM node:lts

LABEL maintainer="Satake Ryota <satake00157@gmail.com>" \
    description="nodejsのDockerfile"

# audioグループの作成
RUN usermod -aG audio node

# ALSA関連のパッケージをインストール
RUN apt update && \
    apt upgrade -y && \
    apt install -y \
    alsa-utils

WORKDIR /var/www/html

COPY ./docker-entrypoint.sh /tmp
ENTRYPOINT ["/tmp/docker-entrypoint.sh"]
CMD [ "/sbin/init" ]
