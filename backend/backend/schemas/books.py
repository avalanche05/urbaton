from datetime import datetime
from pydantic import BaseModel
from .cars import Car


class Book(BaseModel):
    id: int
    user_id: int
    parking_id: int
    time_start: datetime
    time_end: datetime
    cars: list[Car]


class BookCreateRequest(BaseModel):
    parking_id: int
    time_start: datetime
    time_end: datetime
    car_ids: list[int]
