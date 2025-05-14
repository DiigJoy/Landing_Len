FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

# Install dependencies with clean npm cache
RUN npm cache clean --force && \
    npm install

COPY . .

# Make sure Vite binds to 0.0.0.0 to be accessible outside the container
ENV HOST=0.0.0.0

EXPOSE 3000

CMD ["npm", "run", "dev"]
