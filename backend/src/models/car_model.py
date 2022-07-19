from sqlalchemy import ForeignKey, Integer, String, Text, Boolean, DateTime
from sqlalchemy.sql.schema import Column
from database import Base


class CarModel(Base):
    """Class CarModel using for describe car model table

    Args:
        Base (_type_): Inheritance from database
    """

    # Define table name
    __tablename__ = 'car_model'

    # Define all column of table car_model
    id = Column(Integer, primary_key=True, doc="Car Model ID")
    car_brand_id = Column(Integer,ForeignKey('car_brand.id'), nullable=False, doc="Relation to Car Brand ID")
    name = Column(String, nullable=False, doc="Car Model Name")
    status = Column(Boolean, nullable=False, doc="Car Model Status")
    create_at = Column(DateTime, nullable=False, doc="Car Model first created")
    update_at = Column(DateTime, nullable=False, doc="Car Model last updated")
