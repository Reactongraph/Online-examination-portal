FROM node:lts-alpine
ENV NODE_ENV=production
WORKDIR /exam-app
COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]
RUN yarn install --production --silent && mv node_modules ../
COPY . .
EXPOSE 3000
RUN chown -R node /exam-app
USER node
CMD ["yarn run", "start:dev"]
