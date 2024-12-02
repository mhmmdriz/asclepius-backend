FROM node:18.20.5-alpine
WORKDIR /app
COPY . .
RUN npm install
EXPOSE 8080
CMD [ "npm", "run", "start"]
