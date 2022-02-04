FROM node AS development

WORKDIR /usr/src/app

COPY package*.json /usr/src/app

RUN npm install

COPY . .

RUN npm run build

FROM node as production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY package*.json /usr/src/app

RUN npm install --only=production

COPY . .

COPY --from=development /usr/src/app/dist ./dist

CMD ["node", "dist/main"]
