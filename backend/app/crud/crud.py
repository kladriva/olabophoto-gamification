from sqlalchemy.orm import Session
from ..database import models
from ..schemas import schemas
from passlib.context import CryptContext

# Pour le hachage des mots de passe
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def get_password_hash(password: str):
    return pwd_context.hash(password)

def verify_password(plain_password: str, hashed_password: str):
    return pwd_context.verify(plain_password, hashed_password)

# Opérations CRUD pour les utilisateurs
def get_user(db: Session, user_id: int):
    return db.query(models.User).filter(models.User.id == user_id).first()

def get_user_by_email(db: Session, email: str):
    return db.query(models.User).filter(models.User.email == email).first()

def get_users(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.User).offset(skip).limit(limit).all()

def create_user(db: Session, user: schemas.UserCreate):
    hashed_password = get_password_hash(user.password)
    db_user = models.User(email=user.email, username=user.username, hashed_password=hashed_password)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

# Opérations CRUD pour les photos
def get_photo(db: Session, photo_id: int):
    return db.query(models.Photo).filter(models.Photo.id == photo_id).first()

def get_public_photos(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.Photo).filter(models.Photo.is_public == True).offset(skip).limit(limit).all()

def create_photo(db: Session, photo: schemas.PhotoCreate):
    db_photo = models.Photo(**photo.model_dump())
    db.add(db_photo)
    db.commit()
    db.refresh(db_photo)
    return db_photo

# ... (Tu peux ajouter d'autres fonctions CRUD ici au fur et à mesure)
