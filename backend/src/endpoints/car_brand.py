from operator import and_
from fastapi import FastAPI, APIRouter, Depends, status, HTTPException
from sqlalchemy.orm import Session
from sqlalchemy import asc, exc
from database import get_db
from src.schemas.car_brand import CarBrandRequest
from src.models.car_brand import CarBrand
from datetime import datetime 

# Define main route of car brand
router = APIRouter(
    prefix="/car-brand",
    tags=["Car Brand"],
    responses={404: {"description": "Not found"}},
)

@router.get("/all")
def get_all_car_brand(db: Session = Depends(get_db)):
    """function get_all_car_brand using for get all car brand

    Args:
        db (Session, optional): Call db session. Defaults to Depends(get_db).

    Returns:
        _type_: Get all of car brand 
    """    
    list_car_brand = db.query(CarBrand).order_by(asc(CarBrand.name)).all()

    return list_car_brand

@router.get("/filter-by-id/{car_brand_id}")
def get_by_id(car_brand_id: int, db: Session = Depends(get_db)):
    """function get_by_id using for get brand car by id 

    Args:
        car_brand_id (int): Parameter car brand id
        db (Session, optional): Call db session. Defaults to Depends(get_db).
    
    Raises:
        HTTPException: Error code 404 if car brand id is not exist

    Returns:
        _type_: Model CarBrand (All field of car_brand table)
    """    
    list_car_brand = db.query(CarBrand).filter(CarBrand.id == car_brand_id).first()
    if list_car_brand is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,detail="Car brand is not exists")

    return list_car_brand

@router.get("/filter-by-name/{car_brand_name}")
def get_by_name(car_brand_name: str, db: Session = Depends(get_db)):
    """function get_by_name using for get brand car by name

    Args:
        car_brand_name (str): Parameter car brand name
        db (Session, optional): Call db session. Defaults to Depends(get_db).

    Raises:
        HTTPException: Error code 404 if car brand name is not exist
        HTTPException: Error code 500 if something problem in database

    Returns:
        _type_:  Model CarBrand (All field of car_brand table)
    """    
    list_car_brand = db.query(CarBrand).filter(CarBrand.name == car_brand_name).first()
    if list_car_brand is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,detail="Car brand is not exists")

    return list_car_brand

@router.post("/create")
def create_a_brand(details: CarBrandRequest, db: Session = Depends(get_db)):
    """function create_a_band using for create a new brand

    Args:
        details (CarBrandRequest): All field from car_brand table except id , create_at and update_at
        db (Session, optional): Call db session. Defaults to Depends(get_db).

    Raises:
        HTTPException: Error code 400 if car brand name already exist
        HTTPException: Error code 500 if something problem in database

    Returns:
        _type_:  Model CarBrand (All field of car_brand table)
    """
    db_car_brand=db.query(CarBrand).filter(CarBrand.name==details.name).first()

    if db_car_brand is not None:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST,detail="Car brand name already exists")

    new_car_brand = CarBrand(
        name=details.name,
        logo=details.logo,
        description=details.description,
        status=details.status,
        create_at=datetime.now(),
        update_at=datetime.now(),
    )

    try:
        db.add(new_car_brand)
        db.commit()
    except exc.IntegrityError as err:
        db.rollback()
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,detail=str(err))

    new_car_brand=db.query(CarBrand).filter(CarBrand.id==new_car_brand.id).first()

    return new_car_brand

@router.put("/update/{car_brand_id}")
def update_a_brand(car_brand_id: int, details: CarBrandRequest, db: Session = Depends(get_db)):
    """function update a brand using for update table car_brand depends on car brand id

    Args:
        car_brand_id (int): Parameter car brand id
        details (CarBrandRequest): All field which is will be updated to table car_brand except id
        db (Session, optional): Call db session. Defaults to Depends(get_db).

    Raises:
        HTTPException: Error code 400 if car brand id is not exist
        HTTPException: Error code 400 if car brand name already exist another update id
        HTTPException: Error code 500 if something problem in database

    Returns:
        _type_:  Model CarBrand (All field of car_brand table)
    """
    update_car_brand=db.query(CarBrand).filter(CarBrand.id==car_brand_id).first()

    if update_car_brand is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,detail="Car brand is not exists")

    car_brand_by_name=db.query(CarBrand).filter(and_(CarBrand.name==details.name,CarBrand.id!=car_brand_id)).first()

    if car_brand_by_name is not None:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST,detail="Car brand name already exists")    

    update_car_brand.name=details.name
    update_car_brand.logo=details.logo
    update_car_brand.description=details.description
    update_car_brand.status=update_car_brand.status
    update_car_brand.update_at=datetime.now()

    try:
        db.commit()
    except exc.IntegrityError as err:
        db.rollback()
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,detail=str(err))

    update_car_brand=db.query(CarBrand).filter(CarBrand.id==car_brand_id).first()

    return update_car_brand


@router.delete("/{car_brand_id}/delete")
def delete_a_brand(car_brand_id: int, db: Session = Depends(get_db)):
    """function delete_a_brand using for delete a brand depends on car brand id

    Args:
        car_brand_id (int): Parameter car brand id
        db (Session, optional): Call db session. Defaults to Depends(get_db).

    Raises:
        HTTPException: Error code 404 if car brand is not exist
        HTTPException: Error code 500 if something problem in database

    Returns:
        _type_:  Model CarBrand (All field of car_brand table)
    """    
    delete_car_brand=db.query(CarBrand).filter(CarBrand.id==car_brand_id).first()

    if delete_car_brand is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,detail="Car brand is not exists")

    try:
        db.query(CarBrand).filter(CarBrand.id == car_brand_id).delete()
        db.commit()
    except exc.IntegrityError as err:
        db.rollback()
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,detail=str(err))

    return delete_car_brand