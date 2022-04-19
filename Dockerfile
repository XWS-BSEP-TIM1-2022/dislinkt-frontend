FROM node:16.3.0-alpine as node
WORKDIR /app
COPY ./dislinkt-frontend/dislinkt-frontend/package*.json .
RUN npm install
COPY ./dislinkt-frontend/dislinkt-frontend .
RUN npm run build --prod
#stage 2
FROM nginx:alpine
COPY --from=node /app/dist/dislinkt-frontend /usr/share/nginx/html
