FROM node:20 as builder

WORKDIR /build

COPY package*.json .

RUN apt-get update && \
    apt-get install -y --no-install-recommends \
        ffmpeg && \
    rm -rf /var/lib/apt/lists/*
    
RUN npm install

COPY Auth-Info/ Auth-Info/
COPY Commands/ Commands/
COPY utils/ utils/
COPY Handlers/ Handlers/
COPY storage/ storage/
COPY scraper/ scraper/
COPY config.js config.js
COPY index.js index.js

RUN npm start