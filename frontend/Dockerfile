# Dockerfile pour l'application Next.js (frontend)

# Utilisation d'une image Node.js avec les outils nécessaires pour Next.js
FROM node:18-alpine AS development

WORKDIR /app

# Copie des fichiers package.json et package-lock.json pour installer les dépendances
COPY package*.json ./

# Installation des dépendances
RUN npm install

# Copie du reste des fichiers de l'application
COPY . .

# Exposition du port par défaut de Next.js
EXPOSE 3000

# Commande pour démarrer l'application en mode développement
CMD ["npm", "run", "dev"]

# Pour la production, tu aurais une étape de build et une image plus légère
# FROM node:18-alpine AS builder
# WORKDIR /app
# COPY . .
# RUN npm install --frozen-lockfile
# RUN npm run build

# FROM nginx:alpine AS production
# COPY --from=builder /app/.next/static /usr/share/nginx/html/_next/static
# COPY --from=builder /app/public /usr/share/nginx/html
# COPY nginx.conf /etc/nginx/conf.d/default.conf
# EXPOSE 80
# CMD ["nginx", "-g", "daemon off;"]
