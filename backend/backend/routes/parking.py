import datetime
from pathlib import Path
from typing import Annotated, List, Tuple

from fastapi import APIRouter, Body, Depends, HTTPException
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy.orm import Session

from backend import schemas, crud, serializers, errors, models, utils
from backend.dependencies import get_db, current_user
from backend.ml.workload import WorkloadInference

parking_router = APIRouter(
    prefix="/parking",
    tags=['Parking']
)


WORKLOAD_INFERENCE = WorkloadInference(
    Path('resources/workload-model'),
    Path('resources/statistics.csv')
)
WORKLOAD_INFERENCE.load()


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


@parking_router.get(path='/workload')
def get_workload(zone_id: int, day_inside_week: datetime.date) -> schemas.WorkLoad:
    return WORKLOAD_INFERENCE.get_stats_at_week(zone_id, day_inside_week)


@parking_router.post(path='/favorite')
def add_to_favorite(
        parking_id: int,
        user: models.User = Depends(current_user),
        db: Session = Depends(get_db)) -> schemas.Parking:

    parking = crud.add_to_favorite(db, user, parking_id)
    return parking
