import time

from sqlalchemy import JSON, Column, Date, Integer, String, Text

from .database import Base


class CrawlingSite(Base):
    __tablename__ = "crawling_site"

    id = Column(Integer, primary_key=True, index=True)
    site = Column(String(255), unique=True, index=True, nullable=False)
    info = Column(JSON, nullable=False)

class CrawlingPetResult(Base):
    __tablename__ = "crawling_pet_result"

    id = Column(Integer, primary_key=True)
    type = Column(String(255), index=True, nullable=False)
    site = Column(Text, nullable=False)
    found_or_lost_date = Column(Date)
    created_date = Column(Date)
    keywords = Column(Text)
    breed = Column(String(255))
    gender = Column(String(255))
    age = Column(String(255))
    location = Column(String(255))
    name = Column(String(255))

class CrawlingOwnerResult(Base):
    __tablename__ = "crawling_owner_result"

    id = Column(Integer, primary_key=True)
    type = Column(String(255), index=True, nullable=False)
    site = Column(Text, nullable=False)
    found_or_lost_date = Column(Date)
    created_date = Column(Date)
    keywords = Column(Text)
    breed = Column(String(255))
    gender = Column(String(255))
    age = Column(String(255))
    location = Column(String(255))
    name = Column(String(255))
