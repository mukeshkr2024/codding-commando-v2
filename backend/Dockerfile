# Use Node.js base image for development
FROM node:18 AS base

WORKDIR /app

# Install dependencies including optional ones
COPY package.json package-lock.json ./
RUN npm install --include=optional sharp  # Install sharp with optional dependencies

# Copy application code
COPY . .

# Expose the port for your application
EXPOSE 8000

# Set the default command for the container in development mode
CMD ["npm", "run", "dev"]
