FROM node:18
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm ci --only=production --omit=dev
COPY . .

EXPOSE 11000
CMD [ "npm", "start" ]