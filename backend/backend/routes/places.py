from datetime import datetime
from typing import Annotated, List, Tuple

from fastapi import APIRouter, Body, Depends, HTTPException
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy.orm import Session

from backend import schemas, crud, serializers, errors, models
from backend.dependencies import get_db, current_user

place_router = APIRouter(
    prefix="/place",
    tags=['Place']
)


@place_router.get(path="/")
def places_by_parking_id(
        parking_id: int,
        time_start: datetime,
        time_end: datetime,
        db: Session = Depends(get_db),
) -> list[schemas.Place]:
    db_places, busy_place_ids = crud.places_by_parking_id(db, parking_id, time_start, time_end)

    return serializers.get_places(db_places, busy_place_ids)
