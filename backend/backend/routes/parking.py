from typing import Annotated, List, Tuple

from fastapi import APIRouter, Body, Depends, HTTPException
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy.orm import Session

from backend import schemas, crud, serializers, errors, models, utils
from backend.dependencies import get_db, current_user

parking_router = APIRouter(
    prefix="/parking",
    tags=['Parking']
)


@parking_router.post(path="/")
def parking_list(db: Session = Depends(get_db)
                 ) -> list[schemas.Parking]:
    db_parking_list = crud.get_parking_list(db, None)

    return serializers.get_parkings(db_parking_list)


@parking_router.get(path="/geo")
def get_coordinates(address: str) -> schemas.PolygonPoint:
    """
    Get coordinates from address using geocoder.
    """

    return schemas.PolygonPoint(**utils.get_coordinates(address))
