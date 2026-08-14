FROM node:22-alpine AS build
WORKDIR /app
ARG VITE_FORMS_API_BASE_URL
ARG VITE_CONTACT_FORM_ENDPOINT=/api/contact
ARG VITE_INQUIRY_FORM_ENDPOINT=/api/contact
ARG VITE_RECAPTCHA_SITE_KEY
ENV VITE_FORMS_API_BASE_URL=$VITE_FORMS_API_BASE_URL
ENV VITE_CONTACT_FORM_ENDPOINT=$VITE_CONTACT_FORM_ENDPOINT
ENV VITE_INQUIRY_FORM_ENDPOINT=$VITE_INQUIRY_FORM_ENDPOINT
ENV VITE_RECAPTCHA_SITE_KEY=$VITE_RECAPTCHA_SITE_KEY
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
