FROM node:19

WORKDIR /usr/src/app

COPY . .

RUN yarn install --frozen-lockfile

EXPOSE 8000

CMD yarn start