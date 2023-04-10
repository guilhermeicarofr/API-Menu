FROM node:19

WORKDIR /api

COPY . .

RUN npm install

ENV PORT=4000
ENV DATABASE_URL='mongodb://db:27017/menu'
ENV SECRET='top_secret'

EXPOSE 4000
