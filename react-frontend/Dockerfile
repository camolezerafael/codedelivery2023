FROM node:18.14.0-alpine3.17

RUN apk add --no-cache bash

USER node

WORKDIR /home/node/app

COPY ./package*.json ./

ENV PATH /app/node_modules/.bin:$PATH