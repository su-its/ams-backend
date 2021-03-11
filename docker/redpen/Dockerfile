FROM openjdk:15.0.2-jdk-buster

LABEL maintainer="Satake Ryota <satake00157@gmail.com>" \
    description="RedPen用のDockerfile"

# Redpenのversion指定
ENV Redpen_ver 1.10.4

# 何故aptではダメなのか
# 参考URL https://wp.tekapo.com/2019/07/15/difference-between-apt-and-apt-get/

# Javaをインストール
RUN apt-get update && \
    apt-get upgrade -y && \
    apt-get install -y wget tar

# Redpenをインストール
RUN wget https://github.com/redpen-cc/redpen/releases/download/redpen-${Redpen_ver}/redpen-${Redpen_ver}.tar.gz && \
    tar xvf redpen-${Redpen_ver}.tar.gz && \
    cp -av redpen-distribution-${Redpen_ver}/* /usr/local/ && \
    rm -rf redpen-distribution-${Redpen_ver}

# Dockerfileでpathを通すときはRUNではなくENVでやらないとダメ
# 参考URL https://qiita.com/TakashiOshikawa/items/2b8974c242a7054e0be5

# pathに追加
ENV PATH $PATH:/usr/local/bin

# shはtmpフォルダにあるけど、
# バインドマウントしてるのはredpenフォルダ
WORKDIR /redpen

# Redpen用のshをセット
COPY ./docker-entrypoint.sh /tmp
ENTRYPOINT ["/tmp/docker-entrypoint.sh"]
CMD [ "/sbin/init" ]
