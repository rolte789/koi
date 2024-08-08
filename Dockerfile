FROM ubuntu:24.04

COPY . /tmp/

ENV TZ=Asia/Shanghai
ENV SHELL=/bin/bash
ENV LANG=C.UTF-8

WORKDIR /app

RUN apt-get update && \
    apt-get install --no-install-recommends -y \
    bash \
    ca-certificates \
    git \
    tzdata \
    unzip && \
    ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && \
    echo $TZ > /etc/timezone && \
    unzip -q /tmp/koipy*.zip -d /app/ && \ 
    mv /tmp/koipy /app/ && \ 
    git clone --single-branch --depth=1 https://github.com/twitter/twemoji.git /app/resources/emoji/twemoji && \
    chmod +x /app/koipy && \ 
    apt-get clean && \ 
    rm -rf /tmp/* && \
    rm -rf /var/lib/apt/lists/*

ENTRYPOINT ["/app/koipy"]
