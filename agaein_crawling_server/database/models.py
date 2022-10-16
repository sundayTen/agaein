from ast import keyword
import time

from sqlalchemy import JSON, Column, Date, ForeignKey, Integer, String, Text
from sqlalchemy.orm import relationship

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

class Breed(Base):
    __tablename__ = "breed"

    id = Column(Integer, primary_key=True, index=True)
    type = Column(String(255), nullable=False)
    breed = Column(String(255), nullable=False)

    lfp = relationship("Lfp", backref="breed")
    lfg = relationship("Lfg", backref="breed")

class Lfp(Base):
    __tablename__ = "lfp"

    id = Column(Integer, primary_key=True)
    article_id = Column(Integer, index=True, nullable=False)
    breed_id = Column(Integer, ForeignKey("breed.id"))
    name = Column(Text, nullable=False)
    feature = Column(String(255))
    gender = Column(String(255))
    age = Column(Integer)
    email = Column(String(255))
    status = Column(String(255), nullable=False)
    lost_date = Column(Date)
    location = Column(JSON)

class Lfg(Base):
    __tablename__ = "lfg"

    id = Column(Integer, primary_key=True)
    article_id = Column(Integer, index=True, nullable=False)
    breed_id = Column(Integer, ForeignKey("breed.id"))
    name = Column(Text, nullable=False)
    feature = Column(String(255))
    gender = Column(String(255))
    age = Column(Integer)
    email = Column(String(255))
    status = Column(String(255), nullable=False)
    found_date = Column(Date)
    location = Column(JSON)

class Article(Base):
    __tablename__ = "article"

    id = Column(Integer, primary_key=True)
    created_at = Column(Date)

    article_keywords = relationship("ArticleKeyword", backref="article")

class ArticleKeyword(Base):
    __tablename__ = "article_keyword"

    id = Column(Integer, primary_key=True)
    article_id = Column(Integer, ForeignKey("article.id"))
    keyword_id = Column(Integer, ForeignKey("keyword.id"))

class Keyword(Base):
    __tablename__ = "keyword"

    id = Column(Integer, primary_key=True)
    keyword = Column(String(255), index=True, nullable=False)

    article_keyword = relationship("ArticleKeyword", backref="keyword")