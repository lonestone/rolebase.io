FROM node:20-alpine

WORKDIR /app

COPY ../../package-lock.json ./
COPY ../../package.json ./
COPY ../../packages/backend/package.json ./packages/backend/
COPY ../../packages/shared/package.json ./packages/shared/
COPY ../../packages/emails/package.json ./packages/emails/

ENV NODE_OPTIONS=--max-old-space-size=2048
ENV GENERATE_SOURCEMAP=false

RUN npm install

COPY ../.. .

EXPOSE 8888

WORKDIR /app/packages/backend
CMD ["npm", "start"]
