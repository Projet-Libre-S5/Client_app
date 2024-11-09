FROM node:latest as build

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

COPY . .

RUN npm run build --prod

FROM nginx:alpine

COPY --from=build /app/dist/client-app/browser /usr/share/nginx/html


RUN npm test


EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
