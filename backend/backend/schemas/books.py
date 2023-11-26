from datetime import datetime
from typing import Optional

from pydantic import BaseModel
from .cars import Car


class Book(BaseModel):
    id: int
    user_id: int
    parking_id: int
    place_id: int | None
    time_start: datetime
    time_end: datetime
    cars: list[Car]


class BookCreateRequest(BaseModel):
    parking_id: int
    time_start: datetime
    time_end: datetime
    car_ids: list[int]
    place_id: Optional[int] = None
