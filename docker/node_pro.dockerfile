## Get image
ARG VERSION
FROM node:$VERSION

## Arguments: They need to be declared after FROM in order to work
ARG SERVICE

## Install dependencies
WORKDIR /usr/src
COPY ./app/$SERVICE/package*.json ./
RUN npm ci
ENV PATH /usr/src/node_modules/.bin:$PATH

## Bundle source
WORKDIR /usr/src/app
COPY ./app/$SERVICE ./

## Build for production
RUN npm run build

## Start app
CMD [ "npm", "start" ]