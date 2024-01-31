FROM node:16

WORKDIR /usr/share/capstone2_BE
COPY package*.json ./

RUN yarn install

COPY prisma ./prisma

RUN yarn prisma generate

COPY . .

CMD ["node","src/server.js"]