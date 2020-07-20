FROM node:14.5.0-alpine3.10

RUN apk add yarn

COPY . /interfaz/

WORKDIR /interfaz

RUN yarn install && \
    yarn build && \
    npm install -g serve

EXPOSE 5000

CMD serve -s build -l 5000
