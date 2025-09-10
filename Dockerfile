# Dockerfile

FROM node:22-alpine

WORKDIR /app

COPY package*.json ./
COPY tsconfig.json ./

RUN yarn install

COPY . .

CMD ["yarn", "start:dev"]
