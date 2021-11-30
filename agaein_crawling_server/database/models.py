# 표준 라이브러리
import time

# 서드 파티 라이브러리
from sqlalchemy import Column, Integer, String, JSON

# 로컬
from .database import Base


# 유저
class CrawlingSite(Base):
    __tablename__ = "crawling_site"

    id = Column(Integer, primary_key=True, index=True)
    site = Column(String(255), unique=True, index=True, nullable=False)
    info = Column(JSON, nullable=False)
