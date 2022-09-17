# Install dependencies only when needed
FROM node:16-alpine AS deps
#
RUN apk add --no-cache libc6-compat
# Set Workdir
WORKDIR /app
# Copy files
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

# Rebuild the source code only when needed
FROM node:16-alpine AS builder
# Set Workdir
WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules

COPY . .

RUN yarn build

# Production image, copy all the files and run next
FROM node:16-alpine AS runner
WORKDIR /app

ENV NODE_ENV production

RUN addgroup --system --gid 1001 sipenagroup
RUN adduser --system --uid 1001 sipenauser

COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder --chown=sipenauser:sipenagroup /app/.next/standalone ./
COPY --from=builder --chown=sipenauser:sipenagroup /app/.next/static ./.next/static

USER sipenauser

EXPOSE 3000

ENV PORT 3000

CMD ["node", "server.js"]