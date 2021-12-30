FROM node:17 AS builder

WORKDIR /work

RUN npm i -g pnpm

COPY ./package.json /work/package.json
COPY ./pnpm-lock.yaml /work/pnpm-lock.yaml

RUN pnpm install

COPY . /work

ARG MODE=production

RUN pnpm build -- --mode=${MODE}

FROM nginx:1.20

COPY --from=builder /work/dist /usr/share/nginx/html
COPY --from=builder /work/default.conf /etc/nginx/conf.d/default.conf
