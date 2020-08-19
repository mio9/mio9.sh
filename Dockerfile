FROM node:14-alpine

WORKDIR /usr/src/app
COPY package*.json ./

# install the dependencies
RUN npm install

# copy the project in
COPY . .

# nuxt build the project
RUN npm run build

EXPOSE 80
CMD [ "npm","start" ]