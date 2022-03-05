# 표준 라이브러리
import time

# 서드 파티 라이브러리
from sqlalchemy import Column, Integer, String, JSON, Text, Date

# 로컬
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
    found_date = Column(Date)
    created_date = Column(Date)
    keywords = Column(Text)
    breed = Column(String(255))
    gender = Column(String(255))
    age = Column(String(255))
    location = Column(String(255))
    name = Column(String(255))
