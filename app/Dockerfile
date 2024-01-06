FROM node:18

# Create app directory
WORKDIR .

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)


COPY ./dist/index.js index.jsx
COPY ./build build
COPY package.json package.json

RUN npm install --omit=dev
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source

EXPOSE 8090
CMD [ "node", "index.jsx" ]