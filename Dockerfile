FROM node:20

WORKDIR /app

COPY package*.json ./

RUN npm i

COPY prisma ./prisma

RUN npx prisma generate

COPY . .

EXPOSE 5000

CMD [ "npm", "run", "start" ]