from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from dotenv import load_dotenv
import os

# Charge les variables d'environnement du fichier .env
load_dotenv()

# Importe les modèles et la base de données (ces fichiers seront créés plus tard)
# from .database import engine, Base, get_db
# from . import models, schemas, crud

app = FastAPI(
    title="OlaboPhoto API",
    description="API pour le jeu de gamification OlaboPhoto - Devinez le contexte de la photo",
    version="0.1.0"
)

# Configuration CORS pour permettre au frontend de communiquer avec le backend
origins = [
    "http://localhost:3000", # L'URL de ton frontend Next.js en dev
    "http://frontend:3000",  # Nom du service frontend dans Docker Compose
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def root():
    return {"message": "Bienvenue sur l'API OlaboPhoto!"}

@app.get("/api/v1/health")
async def health_check():
    return {"status": "ok", "message": "API is running"}

# Exemple d'endpoint qui utilisera la BDD (à décommenter quand les fichiers database.py et models.py seront créés)
# @app.get("/users/{user_id}")
# async def read_user(user_id: int, db: Session = Depends(get_db)):
#     db_user = crud.get_user(db, user_id=user_id)
#     if db_user is None:
#         raise HTTPException(status_code=404, detail="User not found")
#     return db_user

# Exécuter les migrations Alembic au démarrage si nécessaire (en prod)
# @app.on_event("startup")
# async def startup_event():
#     # Ceci est un exemple, la gestion des migrations est généralement faite en dehors de l'app
#     # ou via un script de déploiement.
#     # Dans un contexte Docker, on lancerait 'alembic upgrade head' depuis le Dockerfile ou un script d'entrée.
#     pass
