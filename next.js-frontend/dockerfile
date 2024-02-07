FROM node:alpine

WORKDIR /Next-to-do-list

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "run", "dev"]
