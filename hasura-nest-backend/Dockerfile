FROM node:20

WORKDIR /usr/src/app 

RUN npm install -g @nestjs/cli

COPY --chown=node:node . .

RUN npm ci

USER node

CMD ["npm", "start"]