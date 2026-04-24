FROM node:24-alpine

WORKDIR /app

COPY package.json ./
COPY server.js ./
COPY src ./src
COPY web ./web
COPY data ./data
COPY docs ./docs
COPY database ./database

ENV PORT=4173

EXPOSE 4173

CMD ["node", "server.js"]
