FROM node:16.15.1 as build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . ./
RUN npm run build


FROM nginx:latest
COPY --from=build /app/build/ /usr/share/nginx/html
COPY --from=build /app/config/nginx.conf /etc/nginx/conf.d/default.conf
