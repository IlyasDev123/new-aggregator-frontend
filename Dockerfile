FROM node:18-alpine
WORKDIR '/app'

# Copy package.json and install dependencies
COPY package.json .

# Install dependencies

RUN npm install

# Copy the rest of the files
COPY . .

EXPOSE 3000


CMD ["npm","run", "dev"]

# Build the app
# RUN npm run build
