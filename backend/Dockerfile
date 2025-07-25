# Dockerfile pour l'application FastAPI (backend)

# Utilisation d'une image Python
FROM python:3.10-slim-buster

# Définition du répertoire de travail dans le conteneur
WORKDIR /app

# Copie des fichiers de dépendances pour les installer
COPY requirements.txt .

# Installation des dépendances
RUN pip install --no-cache-dir -r requirements.txt

# Copie du reste des fichiers de l'application
COPY . .

# Exposition du port par défaut de FastAPI (Uvicorn)
EXPOSE 8000

# Commande pour démarrer l'application Uvicorn
# --host 0.0.0.0 est nécessaire pour que l'app soit accessible depuis l'extérieur du conteneur
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
