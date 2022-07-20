from operator import and_
from fastapi import FastAPI, APIRouter, Depends, status, HTTPException
from sqlalchemy.orm import Session
from sqlalchemy import asc, exc
from database import get_db
from src.schemas.car_model import CarModelRequest
from src.models.car_model import CarModel
from datetime import datetime 

# Define main route of car model
router = APIRouter(
    prefix="/car-model",
    tags=["Car Model"],
    responses={404: {"description": "Not found"}},
)

@router.get("/all")
def get_all_car_model(db: Session = Depends(get_db)):
    """function get_all_car_model using for get all car model 

    Args:
        db (Session, optional): Call db session. Defaults to Depends(get_db).

    Returns:
        _type_: Get all of car brand 
    """    
    list_car_model = db.query(CarModel).order_by(asc(CarModel.name)).all()

    return list_car_model

@router.get("/filter-by-id/{car_model_id}")
def get_by_id(car_model_id: int, db: Session = Depends(get_db)):
    """function get_by_id using for get model car by id 

    Args:
        car_model_id (int): Parameter car model id
        db (Session, optional): Call db session. Defaults to Depends(get_db).

    Raises:
        HTTPException: Error code 404 if car model id is not exist

    Returns:
        _type_: Model CarModel (All field of car_model table)
    """    
    list_car_model = db.query(CarModel).filter(CarModel.id == car_model_id).first()
    if list_car_model is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,detail="Car model is not exists")

    return list_car_model

@router.get("/filter-by-name/{car_model_name}")
def get_by_name(car_model_name: str, db: Session = Depends(get_db)):
    """function get_by_name using for get model car by name

    Args:
        car_model_name (str): Parameter car model name
        db (Session, optional): Call db session. Defaults to Depends(get_db).

    Raises:
        HTTPException: Error code 404 if car model name is not exist

    Returns:
        _type_:  Model CarModel (All field of car_model table)
    """   
    list_car_model = db.query(CarModel).filter(CarModel.name == car_model_name).first()
    if list_car_model is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,detail="Car model is not exists")

    return list_car_model


@router.post("/create")
def create_a_car_model(details: CarModelRequest, db: Session = Depends(get_db)):
    """function create_a_car_model using for create a new car model

    Args:
        details (CarModelRequest): All field from car_model table except id , create_at and update_at
        db (Session, optional): Call db session. Defaults to Depends(get_db).

    Raises:
        HTTPException: Error code 400 if car model name already exist
        HTTPException: Error code 400 if car model name already exist
        HTTPException: Error code 500 if something problem in database

    Returns:
        _type_:  Model CarModel (All field of car_model table)
    """
    db_car_model=db.query(CarModel).filter(CarModel.name==details.name).first()

    if db_car_model is not None:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST,detail="Car model name already exists")

    new_car_model = CarModel(
        car_brand_id=details.car_brand_id,
        name=details.name,
        status=details.status,
        create_at=datetime.now(),
        update_at=datetime.now(),
    )
    
    try:
        db.add(new_car_model)
        db.commit()
    except exc.IntegrityError as err:
        db.rollback()
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,detail=str(err))

    new_car_model=db.query(CarModel).filter(CarModel.id==new_car_model.id).first()

    return new_car_model

@router.put("/update/{car_model_id}")
def update_a_car_model(car_model_id: int, details: CarModelRequest, db: Session = Depends(get_db)):
    """function update a car model using for update table car_model depends on car model id

    Args:
        car_model_id (int): _description_
        details (CarModelRequest): _description_
        db (Session, optional): _description_. Defaults to Depends(get_db).

    Raises:
        HTTPException: Error code 404 if car model id is not exist
        HTTPException: Error code 400 if car model name already exist another update id
        HTTPException: Error code 500 if something problem in database

    Returns:
        _type_:  Model CarModel (All field of car_model table)
    """
    update_car_model=db.query(CarModel).filter(CarModel.id==car_model_id).first()

    if update_car_model is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,detail="Car model is not exists")

    car_model_by_name=db.query(CarModel).filter(and_(CarModel.name==details.name,CarModel.id!=car_model_id)).first()

    if car_model_by_name is not None:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST,detail="Car model name already exists")    

    update_car_model.car_brand_id=details.car_brand_id
    update_car_model.name=details.name
    update_car_model.status=details.status
    update_car_model.update_at=datetime.now(),

    try:
        db.commit()
    except exc.IntegrityError as err:
        db.rollback()
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,detail=str(err))

    update_car_model=db.query(CarModel).filter(CarModel.id==car_model_id).first()

    return update_car_model


@router.delete("/{car_model_id}/delete")
def delete_a_car_model(car_model_id: int, db: Session = Depends(get_db)):
    """function delete_a_car_model using for delete a car model depends on car model id

    Args:
        car_model_id (int): _description_
        db (Session, optional): _description_. Defaults to Depends(get_db).

    Raises:
        HTTPException: Error code 404 if car model is not exist
        HTTPException: Error code 500 if something problem in database

    Returns:
        _type_:  Model CarModel (All field of car_model table)
    """    
    delete_car_model=db.query(CarModel).filter(CarModel.id==car_model_id).first()

    if delete_car_model is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,detail="Car model is not exists")

    try:
        db.query(CarModel).filter(CarModel.id == car_model_id).delete()
        db.commit()
    except exc.IntegrityError as err:
        db.rollback()
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,detail=str(err))
        
    return delete_car_model


