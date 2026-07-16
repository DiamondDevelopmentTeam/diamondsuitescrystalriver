FROM node:22-alpine AS build
WORKDIR /app
COPY package*.json ./
COPY client/package*.json ./client/
COPY server/package*.json ./server/
RUN npm install
COPY . .
RUN npm run build
RUN cp client/dist/index.html client/dist/404.html

FROM node:22-alpine AS production
WORKDIR /app
ENV NODE_ENV=production
ENV SERVE_CLIENT=true
COPY package*.json ./
COPY client/package*.json ./client/
COPY server/package*.json ./server/
RUN npm ci --omit=dev
COPY --from=build /app/server/dist ./server/dist
COPY --from=build /app/client/dist ./client/dist
EXPOSE 4100
CMD ["node", "server/dist/index.js"]
