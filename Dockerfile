FROM node:18.16.0

WORKDIR /opt/googledrive

COPY . .

RUN npm install --quiet


CMD [ "node", "/opt/googledrive/index.js" ]
