# First stage: Build stage with all dependencies including dev
FROM node:20 AS builder

WORKDIR /usr/src/app

COPY --chown=node:node . .

RUN npm ci

RUN npm run build

# Second stage: Production stage with minimal dependencies
FROM node:20

WORKDIR /usr/src/app

COPY --from=builder /usr/src/app .

RUN npm ci 

USER node

CMD ["npm", "start"]