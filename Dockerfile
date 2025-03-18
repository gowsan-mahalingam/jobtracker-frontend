# Utiliser l'image officielle de Node.js 20 LTS
FROM node:20-alpine

# Définir le répertoire de travail
WORKDIR /app

# Copier les fichiers de configuration
COPY package*.json ./

# Installer les dépendances
RUN npm install

# Copier le reste du code source
COPY . .

# Exposer le port 3000
EXPOSE 3000

# Commande par défaut pour démarrer l'application
CMD ["npm", "run", "dev"]