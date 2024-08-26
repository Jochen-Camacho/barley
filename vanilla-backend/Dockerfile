FROM node:20

WORKDIR /usr/app/src

COPY --chown=node:node . .

RUN npm ci --omit=dev

USER node

CMD ["npm", "start"]

