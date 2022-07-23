from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
import os  
from dotenv import load_dotenv

# Define base dir route for this project 
BASE_DIR = os.path.dirname(os.path.abspath(__file__))

# Load .env file path 
ENV_FILE = BASE_DIR, '.env'
load_dotenv(os.path.join(BASE_DIR, '.env'))

# This part is used for setting database url
DATABASE_URL = str(os.getenv('DATABASE_URL'))
SQLALCHEMY_DATABASE_URL = DATABASE_URL

# This part is used for define SQLALCHEMY setting 
engine = create_engine(SQLALCHEMY_DATABASE_URL)

# This part is used for create session before execute query 
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# This part is used for fill a MetaData object where newly defined Table objects are collected
Base = declarative_base()

# This part is used for set DB session purpose 
def get_db():
    db = SessionLocal()
    try:
        yield db
    except:
        db.close()