FROM node:14

# Create app directory
WORKDIR /usr/src/app

# Dependencies
COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 5000

CMD ["node", "app.js"]

