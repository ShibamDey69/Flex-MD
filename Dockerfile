FROM node:20 as builder

WORKDIR /build

COPY package*.json .


RUN npm install

COPY Commands/ Commands/
COPY utils/ utils/
COPY Handlers/ Handlers/
COPY storage/ storage/
COPY scraper/ scraper/
COPY config.js config.js
COPY index.js index.js

FROM node:20 as runner
WORKDIR /app

COPY --from=builder /build .
RUN apt-get update && \
    apt-get install -y --no-install-recommends \
        ffmpeg && \
    rm -rf /var/lib/apt/lists/*
    
EXPOSE 10000  
# Assuming your application runs on port 3000

CMD ["npm", "start"]