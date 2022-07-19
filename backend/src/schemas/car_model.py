from datetime import datetime
from pydantic import BaseModel

class CarModelRequest(BaseModel):
    """Class CarModelRequest using for implementation request at endpoints

    Args:
        BaseModel (_type_): Inheritance from pydantic basemodel
    """    

    # The parameter will be use for request
    car_brand_id: int
    name: str
    status: bool
