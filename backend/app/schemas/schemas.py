from pydantic import BaseModel, EmailStr
from datetime import datetime
from typing import Optional

# Schémas pour les utilisateurs
class UserBase(BaseModel):
    email: EmailStr
    username: str

class UserCreate(UserBase):
    password: str

class User(UserBase):
    id: int
    created_at: datetime
    score_total: int
    level: int
    is_active: bool

    class Config:
        from_attributes = True # Ancien orm_mode = True

# Schémas pour les photos
class PhotoBase(BaseModel):
    filename: str
    title: Optional[str] = None
    description: Optional[str] = None
    event_type: Optional[str] = None
    location: Optional[str] = None
    date_taken: Optional[datetime] = None
    difficulty: int = 1
    is_public: bool = True

class PhotoCreate(PhotoBase):
    pass

class Photo(PhotoBase):
    id: int
    uploaded_at: datetime

    class Config:
        from_attributes = True

# Schémas pour les jeux
class GameBase(BaseModel):
    photo_id: int
    is_active: bool = True
    game_type: str = "public"

class GameCreate(GameBase):
    pass

class Game(GameBase):
    id: int
    created_at: datetime
    photo: Photo # Inclut les détails de la photo

    class Config:
        from_attributes = True

# Schémas pour les soumissions
class SubmissionBase(BaseModel):
    game_id: int
    user_id: int # Pour l'instant, sera déduit de l'authentification plus tard
    answer: str

class SubmissionCreate(SubmissionBase):
    pass

class Submission(SubmissionBase):
    id: int
    is_correct: bool
    points_earned: int
    submitted_at: datetime

    class Config:
        from_attributes = True

# Schémas pour les commentaires
class CommentBase(BaseModel):
    game_id: int
    user_id: int # Pour l'instant, sera déduit de l'authentification plus tard
    content: str

class CommentCreate(CommentBase):
    pass

class Comment(CommentBase):
    id: int
    created_at: datetime

    class Config:
        from_attributes = True

# Schémas pour les jeux privés
class PrivateGameBase(BaseModel):
    title: str
    invite_code: str
    is_active: bool = True

class PrivateGameCreate(PrivateGameBase):
    creator_id: int # Sera déduit de l'authentification

class PrivateGame(PrivateGameBase):
    id: int
    creator_id: int
    created_at: datetime

    class Config:
        from_attributes = True

# Schémas pour les achievements
class AchievementBase(BaseModel):
    user_id: int
    badge_type: str

class AchievementCreate(AchievementBase):
    pass

class Achievement(AchievementBase):
    id: int
    earned_at: datetime

    class Config:
        from_attributes = True
