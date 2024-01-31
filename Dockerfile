FROM node:18
WORKDIR /usr/share/capstone2_BE
COPY package*.json .
RUN yarn install --legacy-peer-deps 

COPY prisma ./prisma
RUN yarn prisma generate

COPY . .
CMD ["yarn","start"]
