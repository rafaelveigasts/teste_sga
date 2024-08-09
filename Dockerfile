FROM node:20.11-alpine AS builder

WORKDIR /builder
COPY ./prisma prisma
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM node:20.11-alpine AS runner

ENV TZ America/Sao_Paulo
RUN echo $TZ >  /etc/timezone
ENV LC_ALL pt_BR.UTF-8

WORKDIR /app
COPY ./prisma prisma
COPY package*.json ./
RUN npm install
COPY . .
COPY --from=builder /builder/dist ./dist

EXPOSE 3333

CMD ["npm", "run", "start:prod"]
