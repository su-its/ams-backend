FROM ubuntu:latest

LABEL maintainer="Satake Ryota <satake00157@gmail.com>" \
    description="RedPen用のDockerfile"

# Javaをインストール
RUN apt update && \
    apt upgrade -y && \
    apt install -y openjdk-11-jdk wget tar

# Redpenをインストール
RUN wget https://github.com/redpen-cc/redpen/releases/download/v1.3.0/redpen-1.10.4.tar.gz && \
    tar xvf redpen-1.10.4.tar.gz && \
    cp -av redpen-distribution-1.10.4/* /usr/local/ && \
    rm -rf redpen-distribution-1.10.4

# pathに追加
RUN export PATH=$PATH:/usr/local/bin

WORKDIR /tmp

RUN redpen -c docs/config/Redpen-conig.xml *.md