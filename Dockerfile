FROM node:16-alpine
WORKDIR /app

RUN yarn global add @nestjs/cli

COPY ./package.json .
COPY ./yarn.lock .

RUN yarn

COPY . .

RUN yarn build

CMD ['yarn', 'run', 'start']
