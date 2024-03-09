FROM node:21.6.2-alpine

WORKDIR /app

COPY ../../package-lock.json ./
COPY ../../package.json ./
COPY ../../packages/backend/package.json ./packages/backend/
COPY ../../packages/shared/package.json ./packages/shared/

RUN npm install --max-old-space-size=2048

COPY ../.. .

EXPOSE 8888

WORKDIR /app/packages/backend
CMD ["npm", "start"]
