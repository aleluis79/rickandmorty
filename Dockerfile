### STAGE 1: Build ###

# We label our stage as ‘builder’
FROM node:16-alpine as builder

ARG ENVIRONMENT=prod

COPY package.json ./

## Storing node modules on a separate layer will prevent unnecessary npm installs at each build
RUN npm i && mkdir /ng-app && mv ./node_modules ./ng-app

WORKDIR /ng-app

RUN $(npm bin)/ngcc

COPY . .

## Build the angular app in production mode and store the artifacts in dist folder
RUN $(npm bin)/ng build

### STAGE 2: Setup ###

FROM nginx:1.13.3-alpine

# Copy custom nginx config
COPY ./nginx.conf /etc/nginx/nginx.conf

## Remove default nginx website
RUN rm -rf /usr/share/nginx/html/*

## From ‘builder’ stage copy over the artifacts in dist folder to default nginx public folder
COPY --from=builder /ng-app/dist /usr/share/nginx/html

EXPOSE 8080 443

ENTRYPOINT ["nginx", "-g", "daemon off;"]
