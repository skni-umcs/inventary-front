FROM node:16.15.1 AS development
ENV NODE_ENV development
# Add a work directory
WORKDIR /app
# Cache and Install dependencies
COPY package.json package-lock.json ./
RUN npm install --include=dev
# Copy app home
COPY . ./
# Expose port
#EXPOSE 3000
# Start the app
CMD [ "npm", "start" ]

FROM node:16.15.1 as build

WORKDIR /app

ENV NODE_ENV=production

COPY package.json .
COPY package-lock.json .

RUN npm ci --silent

COPY . .

RUN npm run build

FROM nginx:stable-alpine as production
COPY --from=build /app/build /usr/share/nginx/html
COPY ./config/inventary.conf /etc/nginx/conf.d/inventary.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]