FROM node:14

# Create app directory
WORKDIR /usr/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm ci --only=production --no-update-notifier

# Bundle app source
COPY . .

# Command to run app
CMD npm run start