from sqlalchemy import Column, Integer, String, Boolean, DateTime, Text, ForeignKey, Numeric
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from .database import Base

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String(255), unique=True, index=True, nullable=False)
    username = Column(String(255), unique=True, index=True, nullable=False)
    hashed_password = Column(String(255), nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    score_total = Column(Integer, default=0)
    level = Column(Integer, default=1)
    is_active = Column(Boolean, default=True)

    submissions = relationship("Submission", back_populates="user")
    comments = relationship("Comment", back_populates="user")
    private_games_created = relationship("PrivateGame", back_populates="creator")

class Photo(Base):
    __tablename__ = "photos"

    id = Column(Integer, primary_key=True, index=True)
    filename = Column(String(255), unique=True, nullable=False)
    title = Column(String(255), nullable=True)
    description = Column(Text, nullable=True)
    event_type = Column(String(255), nullable=True) # Ex: mariage, concert, urbain, nature
    location = Column(String(255), nullable=True)
    date_taken = Column(DateTime, nullable=True)
    difficulty = Column(Integer, default=1) # De 1 (facile) à 5 (difficile)
    is_public = Column(Boolean, default=True) # Pour distinguer les photos publiques des privées
    uploaded_at = Column(DateTime(timezone=True), server_default=func.now())

    games = relationship("Game", back_populates="photo")

class Game(Base):
    __tablename__ = "games"

    id = Column(Integer, primary_key=True, index=True)
    photo_id = Column(Integer, ForeignKey("photos.id"))
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    is_active = Column(Boolean, default=True)
    game_type = Column(String(50), default="public") # 'public', 'private'

    photo = relationship("Photo", back_populates="games")
    submissions = relationship("Submission", back_populates="game")
    comments = relationship("Comment", back_populates="game")

class Submission(Base):
    __tablename__ = "submissions"

    id = Column(Integer, primary_key=True, index=True)
    game_id = Column(Integer, ForeignKey("games.id"))
    user_id = Column(Integer, ForeignKey("users.id"))
    answer = Column(String(500), nullable=False)
    is_correct = Column(Boolean, default=False)
    points_earned = Column(Integer, default=0)
    submitted_at = Column(DateTime(timezone=True), server_default=func.now())

    game = relationship("Game", back_populates="submissions")
    user = relationship("User", back_populates="submissions")

class Comment(Base):
    __tablename__ = "comments"

    id = Column(Integer, primary_key=True, index=True)
    game_id = Column(Integer, ForeignKey("games.id"))
    user_id = Column(Integer, ForeignKey("users.id"))
    content = Column(Text, nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    game = relationship("Game", back_populates="comments")
    user = relationship("User", back_populates="comments")

class PrivateGame(Base):
    __tablename__ = "private_games"

    id = Column(Integer, primary_key=True, index=True)
    creator_id = Column(Integer, ForeignKey("users.id"))
    title = Column(String(255), nullable=False)
    invite_code = Column(String(255), unique=True, index=True, nullable=False) # Code unique pour rejoindre
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    # Ajoute ici des relations pour les photos privées spécifiques à ce jeu

    creator = relationship("User", back_populates="private_games_created")

class Achievement(Base):
    __tablename__ = "achievements"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    badge_type = Column(String(255), nullable=False) # Ex: "FirstWin", "PhotoExpert"
    earned_at = Column(DateTime(timezone=True), server_default=func.now())

    user = relationship("User")
