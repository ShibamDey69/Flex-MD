FROM node:20 as builder

WORKDIR /build

COPY package*.json .

RUN npm install

COPY Auth-Info/ Auth-Info/
COPY Commands/ Commands/
COPY utils/ utils/
COPY Handlers/ Handlers/
COPY storage/ storage/
COPY scraper/ scraper/
COPY config.js config.js
COPY index.js index.js

EXPOSE 10000

CMD ["npm","start"]