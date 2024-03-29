import base64
from operator import and_, or_
from fastapi import APIRouter, Depends, File, status, HTTPException,UploadFile
from sqlalchemy.orm import Session
from sqlalchemy import asc, exc, func
from database import get_db
from src.schemas.car_brand import CarBrandRequest
from src.models.car_brand import CarBrand
from src.models.car_model import CarModel
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
    list_car_brand = db.query(CarBrand.id, \
                              CarBrand.name, \
                              CarBrand.logo, \
                              CarBrand.description, \
                              CarBrand.status, \
                              CarBrand.create_at, \
                              CarBrand.update_at,
                              func.count(CarModel.id).label("count_model")) \
                       .join(CarModel,CarBrand.id == CarModel.car_brand_id, isouter=True) \
                       .group_by(CarBrand.id, \
                              CarBrand.name, \
                              CarBrand.logo, \
                              CarBrand.description, \
                              CarBrand.status, \
                              CarBrand.create_at, \
                              CarBrand.update_at) \
                       .order_by(asc(CarBrand.name)) \
                       .all()
    db.commit()

    return list_car_brand

@router.get("/all/{keyword}")
def get_by_keyword(keyword: str, db: Session = Depends(get_db)):
    """function get_by_keyword using for get all car brand by keyword

    Args:
        keyword (str): Parameter for keyword
        db (Session, optional): Call db session. Defaults to Depends(get_db).

    Returns:
        _type_: Get all of car brand 
    """    
    list_car_brand = db.query(CarBrand.id, \
                              CarBrand.name, \
                              CarBrand.logo, \
                              CarBrand.description, \
                              CarBrand.status, \
                              CarBrand.create_at, \
                              CarBrand.update_at,
                              func.count(CarModel.id).label("count_model")) \
                       .join(CarModel,CarBrand.id == CarModel.car_brand_id, isouter=True) \
                       .filter(or_( \
                                    func.lower(CarBrand.name).like("%{}%".format(keyword.lower())), \
                                    func.lower(CarBrand.description).like("%{}%".format(keyword.lower())), \
                        )) \
                       .group_by(CarBrand.id, \
                              CarBrand.name, \
                              CarBrand.logo, \
                              CarBrand.description, \
                              CarBrand.status, \
                              CarBrand.create_at, \
                              CarBrand.update_at) \
                       .order_by(asc(CarBrand.name)) \
                       .all()
    db.commit()

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
    list_car_brand = db.query(CarBrand.id, \
                            CarBrand.name, \
                            CarBrand.logo, \
                            CarBrand.description, \
                            CarBrand.status, \
                            CarBrand.create_at, \
                            CarBrand.update_at,
                            func.count(CarModel.id).label("count_model")) \
                    .join(CarModel,CarBrand.id == CarModel.car_brand_id, isouter=True) \
                    .filter(CarBrand.id == car_brand_id) \
                    .group_by(CarBrand.id, \
                            CarBrand.name, \
                            CarBrand.logo, \
                            CarBrand.description, \
                            CarBrand.status, \
                            CarBrand.create_at, \
                            CarBrand.update_at) \
                    .first()
    db.commit()

    if list_car_brand is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,detail="Car brand is not exists")

    return list_car_brand

@router.get("/filter-by-name/{car_brand_name}")
def get_by_name(car_brand_name: str, db: Session = Depends(get_db)):
    """function get_by_name using for get car brand by name

    Args:
        car_brand_name (str): Parameter car brand name
        db (Session, optional): Call db session. Defaults to Depends(get_db).

    Raises:
        HTTPException: Error code 404 if car brand name is not exist

    Returns:
        _type_:  Model CarBrand (All field of car_brand table)
    """    
    list_car_brand = db.query(CarBrand.id, \
                        CarBrand.name, \
                        CarBrand.logo, \
                        CarBrand.description, \
                        CarBrand.status, \
                        CarBrand.create_at, \
                        CarBrand.update_at,
                        func.count(CarModel.id).label("count_model")) \
                .join(CarModel,CarBrand.id == CarModel.car_brand_id, isouter=True) \
                .filter(CarBrand.name == car_brand_name) \
                .group_by(CarBrand.id, \
                        CarBrand.name, \
                        CarBrand.logo, \
                        CarBrand.description, \
                        CarBrand.status, \
                        CarBrand.create_at, \
                        CarBrand.update_at) \
                .order_by(asc(CarBrand.name)) \
                .first()

    db.commit()

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
    update_car_brand.description=details.description
    update_car_brand.status=details.status
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


@router.patch("/upload-logo/{car_brand_id}")
async def upload_logo(car_brand_id: int, file: UploadFile = File(...), db: Session = Depends(get_db)):
    """function upload_logo using for upload brand logo 

    Args:
        car_brand_id (int): Parameter car brand id
        file (UploadFile, optional): Upload file parameter. Defaults to File(...).
        db (Session, optional): Call db session. Defaults to Depends(get_db).

    Raises:
        HTTPException: _description_
        HTTPException: _description_

    Returns:
        _type_: Model CarBrand (All field of car_brand table)
    """    
    update_car_brand=db.query(CarBrand).filter(CarBrand.id==car_brand_id).first()

    if update_car_brand is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,detail="Car brand is not exists")

    # Read upload data content
    contents = await file.read()
    # Convert upload contents as base64 must decode with utf-8 
    encoded_img = base64.b64encode(contents).decode('utf-8')
    # If encode_img same with current logo do not update
    if encoded_img != update_car_brand.logo :
        update_car_brand.logo = encoded_img
    
    try:
        db.commit()
    except exc.IntegrityError as err:
        db.rollback()
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,detail=str(err))

    update_car_brand=db.query(CarBrand).filter(CarBrand.id==car_brand_id).first()

    return update_car_brand



