FROM node:18-alpine as build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build
FROM nginx:stable-alpine
COPY --from=build /app/build /usr/share/nginx/html
# optional: custom nginx.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

