from datetime import datetime
from pydantic import BaseModel

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
