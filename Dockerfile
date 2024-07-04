FROM ubuntu:24.04

COPY . /tmp/

ENV TZ=Asia/Shanghai
ENV SHELL=/bin/bash
ENV LANG=C.UTF-8

WORKDIR /opt

RUN apt-get update && \
    apt-get install --no-install-recommends -y \
    bash \
    ca-certificates \
    git \
    tzdata \
    unzip && \
    ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && \
    echo $TZ > /etc/timezone && \
    git clone --single-branch --depth=1 https://github.com/twitter/twemoji.git /opt/resources/emoji/twemoji && \
    unzip -q /tmp/koi*.zip -d /opt/ && \
    unzip -q /tmp/scripts.zip -d /opt/resources/scripts/gojajs/ && \
    mv /tmp/koipy /opt/ && \
    chmod +x /opt/koipy && \
    rm -rf /tmp/* && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

ENTRYPOINT ["/opt/koipy"]
