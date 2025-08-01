from sqlalchemy import Column, Integer, String, DateTime, Boolean, Text
from sqlalchemy.sql import func
from app.core.database import Base

class Photo(Base):
    __tablename__ = "photos"
    
    id = Column(Integer, primary_key=True, index=True)
    filename = Column(String(255), nullable=False)
    title = Column(String(255), nullable=False)
    description = Column(Text)
    event_type = Column(String(100))  # "miss", "sport", "festival"
    location = Column(String(255))
    date_taken = Column(DateTime)
    difficulty = Column(String(20), default="Moyen")  # Facile, Moyen, Difficile
    is_public = Column(Boolean, default=True)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime, server_default=func.now())