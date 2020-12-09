FROM node:12-alpine

WORKDIR /usr/src/app

COPY index.html index.html
COPY index.js index.js

CMD [ "node", "index.js" ]