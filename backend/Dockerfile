# Stage 1: Build Stage
FROM node:18 AS build
WORKDIR /app

# Copy package.json and package-lock.json to leverage Docker cache for faster builds
COPY package.json package-lock.json ./
RUN npm ci --only=production 

# Copy application code
COPY . .

# Stage 2: Production Stage
FROM node:18-slim

WORKDIR /app

# Copy only the necessary files from the build stage
COPY --from=build /app /app

# Clean up unnecessary files for a smaller image
RUN npm prune --production  # Remove development dependencies

# Expose the port for your application
EXPOSE 8000

# Set the default command for the container
CMD ["npm", "start"]
