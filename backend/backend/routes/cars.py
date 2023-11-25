from typing import Annotated, List, Tuple

from fastapi import APIRouter, Body, Depends, HTTPException
from fastapi.security import OAuth2PasswordBearer
from requests import Session

from backend import schemas, crud, serializers, errors, models
from backend.dependencies import get_db, current_user

car_router = APIRouter(
    prefix="/car",
    tags=['Car']
)


@car_router.post(path="/create")
def create_cfa_image(car_create: schemas.CarCreateRequest = Body(...),
                     user: models.User = Depends(current_user),
                     db: Session = Depends(get_db)
                     ) -> schemas.Car:
    db_car = crud.create_car(db, car_create, user)

    return serializers.get_car(db_car)
