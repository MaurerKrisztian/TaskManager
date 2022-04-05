FROM node:12.20-alpine AS build
WORKDIR /app
COPY / ./
COPY package*.json ./

RUN npm install -g @angular/cli@13.2.0 && \
    npm install && \
    ng build
COPY . .

FROM nginx:1.17.1-alpine
WORKDIR /app
COPY --from=build /app/dist /usr/share/nginx/html
