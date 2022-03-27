from os import getenv

from dotenv import load_dotenv
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

# DB 키 습득
load_dotenv(verbose=True)
DB_HOST = getenv("DB_HOST")
DB_PORT = getenv("DB_PORT")
DB_NAME = getenv("DB_NAME")
DB_USER = getenv("DB_USER")
DB_PW = getenv("DB_PW")

SQLALCHEMY_DATABASE_URL = (
    "postgresql://"
    + DB_USER
    + ":"
    + DB_PW
    + "@"
    + DB_HOST
    + ":"
    + DB_PORT
    + "/"
    + DB_NAME
)

engine = create_engine(SQLALCHEMY_DATABASE_URL)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()
Base.metadata.create_all(bind=engine)

# db연결
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
