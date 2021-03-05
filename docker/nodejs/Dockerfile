FROM node:lts

LABEL maintainer="Satake Ryota <satake00157@gmail.com>" \
    description="nodejsのDockerfile"

WORKDIR /var/www/html

COPY ./docker-entrypoint.sh /tmp
ENTRYPOINT ["/tmp/docker-entrypoint.sh"]
CMD [ "/sbin/init" ]
