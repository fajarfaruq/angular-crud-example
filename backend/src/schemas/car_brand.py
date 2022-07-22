from datetime import datetime
from pydantic import BaseModel, validator

class CarBrandRequest(BaseModel):
    """Class CarBrandRequest using for implementation request at endpoints

    Args:
        BaseModel (_type_): Inheritance from pydantic basemodel
    """    

    # The parameter will be use for request
    name: str
    logo: str
    description: str
    status: bool

    # This function using for prevent empty name field
    @validator('name', pre=True, always=True)
    def validate_name_length(cls, value):
        if len(value) == 0:
            raise ValueError("Empty name not allowed")
        return value
    
    # This function using for prevent empty description field
    @validator('description', pre=True, always=True)
    def validate_description_length(cls, value):
        if len(value) == 0:
            raise ValueError("Empty description not allowed")
        return value
