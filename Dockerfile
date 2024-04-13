FROM node:alpine3.16

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3333

RUN npm run generate

CMD npm run dev