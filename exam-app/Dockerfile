FROM node:14

WORKDIR /Gaurav/src/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD ["node","start"]