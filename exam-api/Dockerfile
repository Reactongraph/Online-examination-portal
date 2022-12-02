FROM node:14

WORKDIR /Gaurav/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build 
EXPOSE 5000

CMD ["node","dist/main"]