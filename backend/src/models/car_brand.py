from sqlalchemy import Integer, String, Text, Boolean, DateTime
from sqlalchemy.sql.schema import Column
from database import Base

class CarBrand(Base):
    """Class CarBrand using for describe car brand table

    Args:
        Base (_type_): Inheritance from database
    """

    # Define Table Name 
    __tablename__ = 'car_brand'                         

    # Define all column of table car_brand
    id = Column(Integer, primary_key=True, doc="Car Brand ID")
    name = Column(String, nullable=False, doc="Car Brand Name")
    logo = Column(String, nullable=True, doc="Car Brand Logo")
    description = Column(Text, nullable=False, doc="Car Brand Description")
    status = Column(Boolean, nullable=False, doc="Car Brand Status")
    create_at = Column(DateTime, nullable=False, doc="Car Brand first created")
    update_at = Column(DateTime, nullable=False, doc="Car Brand last updated")
