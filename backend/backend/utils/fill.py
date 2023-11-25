
from sqlalchemy.orm import Session
from fastapi import Depends

from backend.dependencies import get_db
from backend.models import Parking


def fill_db(arr: list):
    db = next(get_db())
    for parking in arr:
        parkingDB = Parking(**parking)
        db.add(parkingDB)
    db.commit()
