FROM node:18-alpine AS build

# Disable telemetry
ENV NEXT_TELEMETRY_DISABLED 1

WORKDIR /build

# Copy package and package-lock
COPY package.json yarn.lock ./

# install yarn package manager
RUN set -eux \
    & apk add \
        --no-cache \
        nodejs \
        yarn

# Clean install dependencies based yarn.lock
# Note: We also install dev deps as typeScript may be needed
RUN yarn install --frozen-lockfile

# Copy files
# Use .dockerignore to avoid copying node_modules and others folders and files
COPY . .

# Build application
RUN yarn build

# =======================================
# Image generate dependencies production
# =======================================
FROM node:18-alpine AS dependencies

# Environment Production
ENV NODE_ENV production

WORKDIR /dependencies

# Copy package and package-lock
COPY --from=build /build/package.json .
COPY --from=build /build/package-lock.json ./

# install yarn package manager
RUN set -eux \
    & apk add \
        --no-cache \
        nodejs \
        yarn

# Clean install dependencies based package-lock
RUN yarn install --production --frozen-lockfile

# =======================================
# Image distroless final
# =======================================
FROM gcr.io/distroless/nodejs:18

# Mark as prod, disable telemetry, set port
ENV NODE_ENV production
ENV PORT 3000
ENV NEXT_TELEMETRY_DISABLED 1

WORKDIR /app

# Copy from build
COPY --from=build /build/next.config.js .
COPY --from=build /build/public/ ./public
COPY --from=build /build/.next ./.next
COPY --from=dependencies /dependencies/node_modules ./node_modules

EXPOSE 3000

# Run app command
CMD ["node_modules/.bin/next", "start"]