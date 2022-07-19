from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

# This variable using for define database connection format : [driver]//[username]:[password]@[host]/[database name]
SQLALCHEMY_DATABASE_URL = "postgresql://postgres:Uc4rsD4t4b4se5@localhost/UcarsTest"

engine = create_engine(SQLALCHEMY_DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

def get_db():
    db = SessionLocal()
    try:
        yield db
    except:
        db.close()