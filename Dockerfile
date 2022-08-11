FROM node:16.15.1 as build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install --include=dev
COPY . ./
RUN npm run build


FROM nginx:latest
COPY --from=build /app/dist/ /usr/share/nginx/html
COPY --from=build /app/config/nginx.conf /etc/nginx/conf.d/default.conf
