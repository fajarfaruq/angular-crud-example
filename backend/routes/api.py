from fastapi import APIRouter

# Import endpoint from folder src/endpoints
from src.endpoints import car_model     
from src.endpoints import car_brand

# Define router as APIRouter()
router = APIRouter()                        

# Define include_router 
router.include_router(car_brand.router)
router.include_router(car_model.router)