FROM node:10
WORKDIR /usr/app
COPY package.json package-lock.json server.js .env ./
RUN npm install --production
COPY ./src ./src
EXPOSE 8080
CMD node server.js
