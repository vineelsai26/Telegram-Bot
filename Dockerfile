FROM node:lts-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN yarn install
RUN npm install -g pm2

COPY . .

EXPOSE 5000
CMD [ "pm2", "start", "server.js" ]