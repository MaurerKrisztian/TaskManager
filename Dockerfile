
# Stage 1
FROM node:16.10-alpine as build-step

RUN mkdir -p /app

WORKDIR /app

COPY package.json /app
COPY package-lock.json /app

RUN npm install

COPY . /app

RUN npm run build --prod

# Stage 2

FROM nginx:1.17.1-alpine
COPY --from=build-step /app/dist /usr/share/nginx/html
