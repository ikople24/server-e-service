FROM node:18-alpine
RUN apk update && apk upgrade && rm -rf /var/cache/apk/*
RUN apk add --no-cache dumb-init
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN addgroup -g 1001 appgroup && \
    adduser -D -u 1001 -G appgroup appuser && \
    chown -R appuser /app
USER appuser
ENTRYPOINT ["dumb-init", "--"]
CMD ["npm", "start"]