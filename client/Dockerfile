ARG bun_version=oven/bun
ARG nginx_version=nginx

FROM ${bun_version} AS builder

WORKDIR /app

COPY ./package.json /app/

RUN bun install

COPY ./ /app/

RUN bun run build

FROM ${nginx_version}

COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80

CMD [ "nginx" , "-g" , "daemon off;"]