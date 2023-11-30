ARG NODE_VERSION=18

FROM node:${NODE_VERSION} AS builder

ARG PNPM_VERSION=8.6.2

# Use development node environment in order to install all required compile-time dependencies.
ENV NODE_ENV=development

# Install pnpm.
RUN npm install -g pnpm@${PNPM_VERSION}

WORKDIR /app

COPY package.json pnpm-lock.yaml tsconfig.json ./

RUN pnpm install --frozen-lockfile

COPY src/ ./src/

RUN pnpm tsc

FROM node:${NODE_VERSION}-alpine

ARG SVC_PORT=8080

# Use PRODUCTION node environment in order to install all required dependencies.
ENV NODE_ENV=production
ENV PORT=$SVC_PORT

# Install pnpm.
RUN npm install -g pnpm@${PNPM_VERSION}

WORKDIR /app

COPY --from=builder --chown=node /app/package.json /app/pnpm-lock.yaml ./

RUN pnpm install --prod --frozen-lockfile

COPY --from=builder --chown=node /app/dist/ ./dist

USER node

EXPOSE $SVC_PORT

CMD "node" "dist/index.js" 