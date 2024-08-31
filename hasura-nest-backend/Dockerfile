FROM node:20

WORKDIR /usr/src/app 

COPY --chown=node:node . .

RUN npm install -g @nestjs/cli

RUN npm ci

USER node

CMD ["npm", "start"]