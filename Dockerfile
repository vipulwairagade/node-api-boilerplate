FROM node:18.12-alpine

# Create app directory
WORKDIR /app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN apk update && \
    apk upgrade && \
    apk add make
RUN npm ci --ignore-scripts --no-update-notifier
COPY . .

# Command to run app
CMD npm run start