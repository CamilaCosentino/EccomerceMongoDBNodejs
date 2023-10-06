FROM node:20-alpine3.17
WORKDIR /app
COPY package.json .
RUN npm install
COPY . /app
EXPOSE 8080
ENV MONGO_URI="mongodb+srv://cami:cami0503@cluster0.17xc4.mongodb.net/ECOMMERCE?retryWrites=true&w=majority"
CMD ["npm", "start"]



