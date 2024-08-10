FROM node:20.11-alpine AS builder
WORKDIR /app
COPY package*.json ./
COPY prisma ./prisma/
RUN npm install
COPY . .
RUN npm run build

FROM node:20.11-alpine AS runner
ENV TZ=America/Sao_Paulo
RUN apk add --no-cache tzdata \
    && cp /usr/share/zoneinfo/$TZ /etc/localtime \
    && echo $TZ > /etc/timezone \
    && apk del tzdata
ENV LC_ALL=pt_BR.UTF-8

WORKDIR /app

COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules/
COPY --from=builder /app/prisma ./prisma/
COPY --from=builder /app/dist ./dist/

EXPOSE 3333

CMD ["npm", "run", "start:prod"]
