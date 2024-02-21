# Build Stage
FROM node:20-alpine as builder

WORKDIR /build

COPY package*.json ./

RUN apk update && \
    apk add --no-cache ffmpeg && \
    npm install --production

COPY Commands/ Commands/
COPY utils/ utils/
COPY Handlers/ Handlers/
COPY storage/ storage/
COPY scraper/ scraper/
COPY config.js config.js
COPY index.js index.js

# Runtime Stage
FROM node:20-alpine

WORKDIR /app

COPY --from=builder /build .

EXPOSE 10000  
# Assuming your application runs on port 3000

CMD ["npm", "start"]
