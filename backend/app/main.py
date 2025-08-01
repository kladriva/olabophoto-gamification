from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.core.config import settings
# from app.api.v1 import auth, game, photos

app = FastAPI(
    title="OlaboPhoto Gaming API",
    description="API pour le jeu de gamification OlaboPhoto",
    version="1.0.0"
)

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Routes
# app.include_router(auth.router, prefix="/api/v1/auth", tags=["auth"])
# app.include_router(game.router, prefix="/api/v1/game", tags=["game"])
# app.include_router(photos.router, prefix="/api/v1/photos", tags=["photos"])

@app.get("/")
async def root():
    return {"message": "OlaboPhoto Gaming API -- yy", "version": "1.0.0"}

@app.get("/health")
async def health_check():
    return {"status": "healthy"}