# build
FROM  node:16.16.0-alpine as builder
WORKDIR /app
COPY package.json .
RUN npm install
COPY . .
RUN npm run build

# deploy
FROM nginx
EXPOSE 80
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf
RUN rm -rf /usr/share/nginx/html/* 
COPY --from=builder /app/dist/frontend /usr/share/nginx/html
