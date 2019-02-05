FROM node:alpine

WORKDIR '/app'

COPY package.json ./
RUN npm install
RUN npm audit fix
COPY ./ ./

EXPOSE 5000

CMD node server.js